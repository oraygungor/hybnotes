#!/usr/bin/env python3
# scripts/generate_sitemap.py

import argparse
import datetime as dt
from collections import deque
from urllib.parse import (
    urlparse, urljoin, urlunparse, parse_qsl, urlencode
)
from xml.sax.saxutils import escape

from playwright.sync_api import sync_playwright

LANGS_DEFAULT = ["tr", "en"]
ALLOWED_QUERY_KEYS = {"page", "article", "lang"}


def _norm_base(base: str) -> str:
    """Ensure base is a valid absolute URL, normalized to origin + '/'."""
    p = urlparse(base)
    if not p.scheme or not p.netloc:
        raise ValueError(f"--base/--canonical must be an absolute URL, got: {base}")
    origin = f"{p.scheme}://{p.netloc}"
    return origin + "/"


def _toggle_www(netloc: str) -> str:
    """Return www<->non-www variant of a netloc."""
    if netloc.startswith("www."):
        return netloc[len("www."):]
    return "www." + netloc


def _prefer_www_origin(origin: str) -> str:
    """Force origin to www.<domain> form."""
    p = urlparse(origin)
    netloc = p.netloc
    if not netloc.startswith("www."):
        netloc = "www." + netloc
    return f"{p.scheme}://{netloc}"


def _prefer_nonwww_origin(origin: str) -> str:
    """Force origin to non-www form."""
    p = urlparse(origin)
    netloc = p.netloc
    if netloc.startswith("www."):
        netloc = netloc[len("www."):]
    return f"{p.scheme}://{netloc}"


def _allowed_origins(canonical_origin: str) -> set[str]:
    """
    Allow canonical origin + its www/non-www counterpart.
    Example: canonical https://www.hybnotes.com -> allow also https://hybnotes.com
    """
    p = urlparse(canonical_origin)
    alt_netloc = _toggle_www(p.netloc)
    alt_origin = f"{p.scheme}://{alt_netloc}"
    return {canonical_origin.rstrip("/"), alt_origin.rstrip("/")}


def _normalize_url(
    url: str,
    canonical_origin: str,
    allowed_origins: set[str],
    drop_lang: bool = False
) -> str:
    """
    Normalize URL:
    - absolute-ize relative urls using canonical_origin
    - accept only allowed origins (canonical + www/non-www alt)
    - map accepted urls to canonical netloc
    - remove fragment
    - keep only allowed query keys (page/article/lang)
    - optionally drop 'lang' (for discovery) to reduce duplicates
    - stable query ordering: lang, page, article
    - normalize path: '/' if empty
    """
    u = urlparse(url)
    if not u.scheme:
        url = urljoin(canonical_origin.rstrip("/") + "/", url)
        u = urlparse(url)

    this_origin = f"{u.scheme}://{u.netloc}".rstrip("/")
    if this_origin not in allowed_origins:
        return ""

    # force canonical scheme+netloc
    c = urlparse(canonical_origin.rstrip("/"))
    scheme, netloc = c.scheme, c.netloc

    path = u.path or "/"
    fragment = ""

    q = parse_qsl(u.query, keep_blank_values=False)
    q = [(k, v) for (k, v) in q if k in ALLOWED_QUERY_KEYS and v]

    if drop_lang:
        q = [(k, v) for (k, v) in q if k != "lang"]

    order = {"lang": 0, "page": 1, "article": 2}
    q.sort(key=lambda kv: (order.get(kv[0], 9), kv[0], kv[1]))
    query = urlencode(q, doseq=True)

    return urlunparse((scheme, netloc, path, "", query, fragment))


def _set_lang(url: str, lang: str, canonical_origin: str, allowed_origins: set[str]) -> str:
    """Return url with lang=<lang> set (and query keys normalized)."""
    norm = _normalize_url(url, canonical_origin, allowed_origins, drop_lang=False)
    if not norm:
        return ""
    u = urlparse(norm)
    q = dict(parse_qsl(u.query, keep_blank_values=False))
    q["lang"] = lang

    q2 = []
    for k in ["lang", "page", "article"]:
        if k in q and q[k]:
            q2.append((k, q[k]))

    query = urlencode(q2)
    return urlunparse((u.scheme, u.netloc, u.path or "/", "", query, ""))


def crawl_site(base: str, canonical: str, max_urls: int, timeout_ms: int) -> set[str]:
    """
    Crawl internal links with Playwright (SPA-friendly).
    Returns a set of normalized URLs mapped to canonical host.
    Discovery stage drops 'lang' to reduce duplicates.
    """
    canonical_origin = _norm_base(canonical).rstrip("/")  # "https://www.hybnotes.com"
    allowed = _allowed_origins(canonical_origin)

    start_raw = _norm_base(base).rstrip("/") + "/"
    start = _normalize_url(start_raw, canonical_origin, allowed, drop_lang=True) or (canonical_origin + "/")

    visited: set[str] = set()
    discovered: set[str] = set()
    q = deque([start])

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        while q and len(visited) < max_urls:
            current = q.popleft()
            current_norm = _normalize_url(current, canonical_origin, allowed, drop_lang=True)
            if not current_norm or current_norm in visited:
                continue

            visited.add(current_norm)

            try:
                resp = page.goto(current_norm, wait_until="networkidle", timeout=timeout_ms)
                status = resp.status if resp else 200
                if status >= 400:
                    continue
            except Exception:
                continue

            try:
                hrefs = page.eval_on_selector_all(
                    "a[href]",
                    "els => els.map(a => a.getAttribute('href')).filter(Boolean)"
                )
            except Exception:
                hrefs = []

            for href in hrefs:
                absu = urljoin(current_norm, href)
                nu = _normalize_url(absu, canonical_origin, allowed, drop_lang=True)
                if not nu:
                    continue
                discovered.add(nu)
                if nu not in visited and len(visited) + len(q) < max_urls:
                    q.append(nu)

        browser.close()

    discovered.add(_normalize_url(canonical_origin + "/", canonical_origin, allowed, drop_lang=True))
    return discovered


def expand_langs(urls: set[str], canonical: str, langs: list[str]) -> list[str]:
    """Generate both lang variants for every discovered URL."""
    canonical_origin = _norm_base(canonical).rstrip("/")
    allowed = _allowed_origins(canonical_origin)

    out: set[str] = set()

    root = canonical_origin + "/"
    for lg in langs:
        out.add(_set_lang(root, lg, canonical_origin, allowed))

    for u in urls:
        for lg in langs:
            ul = _set_lang(u, lg, canonical_origin, allowed)
            if ul:
                out.add(ul)

    def sort_key(x: str):
        pu = urlparse(x)
        return (0 if pu.path == "/" and not pu.query else 1, len(x), x)

    return sorted(out, key=sort_key)


def write_sitemap(urls: list[str], out_path: str, canonical: str, include_lastmod: bool = False):
    now = dt.datetime.utcnow().replace(microsecond=0).isoformat() + "Z"
    canonical_origin_slash = _norm_base(canonical)  # includes trailing /

    lines = []
    lines.append("<?xml version='1.0' encoding='utf-8'?>")
    lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    lines.append(f"  <!-- generated: {now} | canonical: {canonical_origin_slash} -->")

    lastmod = dt.datetime.utcnow().date().isoformat()

    for u in urls:
        lines.append("  <url>")
        lines.append(f"    <loc>{escape(u)}</loc>")
        if include_lastmod:
            lines.append(f"    <lastmod>{lastmod}</lastmod>")
        lines.append("  </url>")

    lines.append("</urlset>\n")

    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", required=True, help='Crawl entry URL, e.g. "https://hybnotes.com/"')
    ap.add_argument(
        "--canonical",
        default=None,
        help='Canonical origin for sitemap output, e.g. "https://www.hybnotes.com/". '
             "If omitted, it will be derived from --base."
    )
    ap.add_argument("--prefer-www", action="store_true", help="If --canonical is omitted, default to www host")
    ap.add_argument("--prefer-nonwww", action="store_true", help="If --canonical is omitted, default to non-www host")
    ap.add_argument("--out", default="sitemap.xml")
    ap.add_argument("--max", type=int, default=5000)
    ap.add_argument("--timeout", type=int, default=30000, help="Navigation timeout (ms)")
    ap.add_argument("--langs", default="tr,en", help='Comma list, default "tr,en"')
    ap.add_argument("--lastmod", action="store_true", help="Include <lastmod> for each URL (today)")

    args = ap.parse_args()

    base_origin = _norm_base(args.base).rstrip("/")  # origin without trailing slash

    if args.canonical:
        canonical = args.canonical
    else:
        # Default behavior: prefer www unless explicitly prefer-nonwww is set.
        if args.prefer_nonwww:
            canonical = _prefer_nonwww_origin(base_origin) + "/"
        else:
            # either --prefer-www or default path
            canonical = _prefer_www_origin(base_origin) + "/"

    langs = [x.strip() for x in args.langs.split(",") if x.strip()] or LANGS_DEFAULT

    discovered = crawl_site(args.base, canonical, max_urls=args.max, timeout_ms=args.timeout)
    final_urls = expand_langs(discovered, canonical=canonical, langs=langs)
    write_sitemap(final_urls, args.out, canonical=canonical, include_lastmod=args.lastmod)


if __name__ == "__main__":
    main()
