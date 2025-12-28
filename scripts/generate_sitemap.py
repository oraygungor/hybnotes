#!/usr/bin/env python3
# scripts/generate_sitemap.py

import argparse
import datetime as dt
from collections import deque
from urllib.parse import urlparse, urljoin, urlunparse, parse_qsl, urlencode

from xml.sax.saxutils import escape

# Optional Playwright import (required in your GH Action)
from playwright.sync_api import sync_playwright


LANGS_DEFAULT = ["tr", "en"]
ALLOWED_QUERY_KEYS = {"page", "article", "lang"}


def _norm_base(base: str) -> str:
    """Ensure base is a valid absolute URL, normalized to origin + '/'."""
    p = urlparse(base)
    if not p.scheme or not p.netloc:
        raise ValueError(f"--base must be an absolute URL, got: {base}")
    origin = f"{p.scheme}://{p.netloc}"
    return origin + "/"


def _normalize_url(url: str, origin: str) -> str:
    """
    Normalize URL:
    - force same origin
    - remove fragment
    - keep only allowed query keys (page/article/lang)
    - stable query ordering: lang, page, article
    - normalize path: '/' if empty
    """
    u = urlparse(url)

    # absolute-ize
    if not u.scheme:
        url = urljoin(origin, url)
        u = urlparse(url)

    # same-origin only
    if f"{u.scheme}://{u.netloc}" != origin.rstrip("/"):
        return ""

    path = u.path or "/"
    # drop fragment
    fragment = ""

    # filter + order query
    q = parse_qsl(u.query, keep_blank_values=False)
    q = [(k, v) for (k, v) in q if k in ALLOWED_QUERY_KEYS and v]
    # stable order
    order = {"lang": 0, "page": 1, "article": 2}
    q.sort(key=lambda kv: (order.get(kv[0], 9), kv[0], kv[1]))

    query = urlencode(q, doseq=True)

    return urlunparse((u.scheme, u.netloc, path, "", query, fragment))


def _set_lang(url: str, lang: str, origin: str) -> str:
    """Return url with lang=<lang> set (and query keys normalized)."""
    u = urlparse(url)
    # absolute-ize & normalize first
    norm = _normalize_url(url, origin)
    if not norm:
        return ""
    u = urlparse(norm)
    q = dict(parse_qsl(u.query, keep_blank_values=False))
    q["lang"] = lang

    # Keep page/article if present, drop everything else
    q2 = []
    for k in ["lang", "page", "article"]:
        if k in q and q[k]:
            q2.append((k, q[k]))

    query = urlencode(q2)
    return urlunparse((u.scheme, u.netloc, u.path or "/", "", query, ""))


def crawl_site(base: str, max_urls: int, timeout_ms: int) -> set[str]:
    """
    Crawl all internal links (anchors) using Playwright (JS-rendered SPA friendly).
    Returns a set of normalized URLs (may include any lang or none).
    """
    origin = _norm_base(base).rstrip("/")  # "https://hybnotes.com"
    start = origin + "/"

    visited: set[str] = set()
    discovered: set[str] = set()

    q = deque([start])

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        while q and len(visited) < max_urls:
            current = q.popleft()
            current_norm = _normalize_url(current, origin)
            if not current_norm or current_norm in visited:
                continue

            visited.add(current_norm)

            try:
                resp = page.goto(current_norm, wait_until="networkidle", timeout=timeout_ms)
                # Even if response is None (rare), continue extracting links
                status = resp.status if resp else 200
                if status >= 400:
                    continue
            except Exception:
                continue

            # collect links from DOM
            try:
                hrefs = page.eval_on_selector_all(
                    "a[href]",
                    "els => els.map(a => a.getAttribute('href')).filter(Boolean)"
                )
            except Exception:
                hrefs = []

            for href in hrefs:
                absu = urljoin(current_norm, href)
                nu = _normalize_url(absu, origin)
                if not nu:
                    continue
                discovered.add(nu)
                if nu not in visited and len(visited) + len(q) < max_urls:
                    q.append(nu)

        browser.close()

    # ensure at least homepage included
    discovered.add(_normalize_url(start, origin))
    return discovered


def expand_langs(urls: set[str], base: str, langs: list[str]) -> list[str]:
    """For every discovered URL, generate both lang variants and return sorted unique list."""
    origin = _norm_base(base).rstrip("/")
    out: set[str] = set()

    # Always include root for both langs
    root = origin + "/"
    for lg in langs:
        out.add(_set_lang(root, lg, origin))

    for u in urls:
        # If URL already has a lang, still produce both
        for lg in langs:
            ul = _set_lang(u, lg, origin)
            if ul:
                out.add(ul)

    # Sort: root first, then others
    def sort_key(x: str):
        pu = urlparse(x)
        # shorter first (often root/pages), then lexicographic
        return (0 if pu.path == "/" and not pu.query else 1, len(x), x)

    return sorted(out, key=sort_key)


def write_sitemap(urls: list[str], out_path: str, base: str):
    now = dt.datetime.utcnow().replace(microsecond=0).isoformat() + "Z"
    origin = _norm_base(base)

    lines = []
    lines.append("<?xml version='1.0' encoding='utf-8'?>")
    lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    lines.append(f"  <!-- generated: {now} | source: crawl {origin} -->")
    for u in urls:
        lines.append("  <url>")
        lines.append(f"    <loc>{escape(u)}</loc>")
        lines.append("  </url>")
    lines.append("</urlset>\n")

    content = "\n".join(lines)

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(content)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", required=True, help='Base URL, e.g. "https://hybnotes.com/"')
    ap.add_argument("--out", default="sitemap.xml")
    ap.add_argument("--max", type=int, default=5000)
    ap.add_argument("--timeout", type=int, default=30000, help="Navigation timeout (ms)")
    ap.add_argument("--langs", default="tr,en", help='Comma list, default "tr,en"')
    args = ap.parse_args()

    langs = [x.strip() for x in args.langs.split(",") if x.strip()]
    if set(langs) != set(LANGS_DEFAULT):
        # still allow custom, but warn by behavior (no print to keep CI clean)
        pass

    discovered = crawl_site(args.base, max_urls=args.max, timeout_ms=args.timeout)
    final_urls = expand_langs(discovered, args.base, langs=langs)
    write_sitemap(final_urls, args.out, args.base)


if __name__ == "__main__":
    main()
