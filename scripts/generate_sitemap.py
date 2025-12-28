#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt
from collections import deque
from urllib.parse import urlparse, urljoin, urlunparse, urlencode, parse_qsl

import xml.etree.ElementTree as ET

from playwright.sync_api import sync_playwright


def normalize_url(raw: str, base: str) -> str | None:
    if not raw:
        return None

    abs_url = urljoin(base, raw)
    p = urlparse(abs_url)

    # sadece aynı domain
    base_netloc = urlparse(base).netloc
    if p.netloc != base_netloc:
        return None

    # fragment at
    p = p._replace(fragment="")

    # path normalize (root mutlaka /)
    path = p.path or "/"
    if path == "":
        path = "/"

    # query paramları stable hale getir (opsiyonel ama duplicate azaltır)
    q = parse_qsl(p.query, keep_blank_values=True)
    q = sorted(q, key=lambda x: (x[0], x[1]))
    query = urlencode(q, doseq=True)

    normalized = urlunparse((p.scheme, p.netloc, path, "", query, ""))
    # https://hybnotes.com -> https://hybnotes.com/
    if normalized.endswith("://"+p.netloc):
        normalized += "/"
    return normalized


def extract_links(page) -> list[str]:
    # DOM'daki tüm anchor href’leri
    hrefs = page.eval_on_selector_all(
        "a[href]",
        "els => els.map(e => e.getAttribute('href')).filter(Boolean)"
    )
    return hrefs or []


def crawl_site(base_url: str, max_urls: int = 2000) -> set[str]:
    seen: set[str] = set()
    q: deque[str] = deque()

    start = normalize_url(base_url, base_url)
    if not start:
        return seen

    q.append(start)
    seen.add(start)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context()
        page = ctx.new_page()

        while q and len(seen) < max_urls:
            url = q.popleft()
            try:
                page.goto(url, wait_until="networkidle", timeout=60_000)
            except Exception:
                # bazı sayfalar timeout verebilir; devam edelim
                continue

            for raw_href in extract_links(page):
                nu = normalize_url(raw_href, base_url)
                if not nu:
                    continue

                if nu not in seen:
                    seen.add(nu)
                    q.append(nu)

        ctx.close()
        browser.close()

    return seen


def write_sitemap(urls: set[str], out_path: str, base_url: str) -> None:
    # Minimal sitemap: sadece <loc>, + comment ile generated timestamp
    urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

    generated_utc = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    urlset.insert(0, ET.Comment(f" generated: {generated_utc} | source: crawl {base_url} "))

    for u in sorted(urls):
        url_el = ET.SubElement(urlset, "url")
        ET.SubElement(url_el, "loc").text = u

    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ", level=0)
    tree.write(out_path, encoding="utf-8", xml_declaration=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="https://hybnotes.com/", help="Site root URL (https://...)")
    ap.add_argument("--out", default="sitemap.xml", help="Output path")
    ap.add_argument("--max", type=int, default=2000, help="Max URL count")
    args = ap.parse_args()

    base = args.base.rstrip("/") + "/"
    urls = crawl_site(base, max_urls=args.max)
    write_sitemap(urls, args.out, base)


if __name__ == "__main__":
    main()
