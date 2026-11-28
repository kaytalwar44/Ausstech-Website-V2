#!/usr/bin/env python3
"""Validate the public marketing pages without external dependencies."""

import argparse
import json
from html.parser import HTMLParser
from pathlib import Path
import re
import struct
from urllib.parse import urlparse
from urllib.robotparser import RobotFileParser
import xml.etree.ElementTree as ET
import zlib


ORIGIN = "https://www.auss-tech.com.au"
PAGES = {
    "index.html": ORIGIN + "/",
    "admin-support/index.html": ORIGIN + "/admin-support/",
    "it-support-sydney/index.html": ORIGIN + "/it-support-sydney/",
}
IMAGE = ORIGIN + "/images/social-card.png"


class Head(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.metas = {}
        self.canonicals = []
        self.titles = []
        self.schemas = []
        self.assets = []
        self.active = None

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if tag == "title":
            self.titles.append("")
            self.active = "title"
        if tag == "meta":
            key = attrs.get("property") or attrs.get("name")
            if key:
                self.metas.setdefault(key, []).append(attrs.get("content", ""))
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs.get("href"))
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.schemas.append("")
            self.active = "schema"
        if tag == "script" and attrs.get("src"):
            self.assets.append(attrs["src"])
        if tag == "link" and attrs.get("rel") in {"stylesheet", "modulepreload"}:
            self.assets.append(attrs.get("href", ""))

    def handle_data(self, data):
        if self.active == "title":
            self.titles[-1] += data
        elif self.active == "schema":
            self.schemas[-1] += data

    def handle_endtag(self, tag):
        if (tag == "title" and self.active == "title") or (
            tag == "script" and self.active == "schema"
        ):
            self.active = None

    def single(self, key):
        values = self.metas.get(key, [])
        assert len(values) == 1 and values[0].strip(), f"{key}: expected one nonempty tag"
        return values[0]


def validate_png(path):
    data = path.read_bytes()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", "Share image is not a PNG"
    assert struct.unpack("!II", data[16:24]) == (1200, 630), "Incorrect image dimensions"
    offset = 8
    chunks = []
    while offset < len(data):
        length = struct.unpack("!I", data[offset:offset + 4])[0]
        kind = data[offset + 4:offset + 8]
        payload = data[offset + 8:offset + 8 + length]
        crc = struct.unpack("!I", data[offset + 8 + length:offset + 12 + length])[0]
        assert zlib.crc32(kind + payload) & 0xffffffff == crc, "PNG checksum mismatch"
        chunks.append(kind)
        offset += 12 + length
    assert chunks[0] == b"IHDR" and chunks[-1] == b"IEND" and b"IDAT" in chunks


def validate_schema(head, canonical):
    assert len(head.schemas) == 1, "Expected exactly one JSON-LD graph per page"
    schema = json.loads(head.schemas[0])
    assert schema["@context"] == "https://schema.org"
    graph = schema["@graph"]
    assert isinstance(graph, list)
    by_type = {}
    for node in graph:
        types = node["@type"] if isinstance(node["@type"], list) else [node["@type"]]
        for kind in types:
            assert kind not in by_type, f"Duplicate schema type: {kind}"
            by_type[kind] = node
    is_sydney = canonical == ORIGIN + "/it-support-sydney/"
    expected = {"Organization", "WebSite", "WebPage"}
    if canonical != ORIGIN + "/":
        expected.add("Service")
    if is_sydney:
        expected.update({"LocalBusiness", "BreadcrumbList"})
    assert set(by_type) == expected
    assert len(graph) == len(expected) - int(is_sydney)
    ids = {node["@id"] for node in graph}
    assert len(ids) == len(graph), "Duplicate schema IDs"
    for node_id in ids:
        assert node_id.startswith(ORIGIN + "/")

    def check_refs(value):
        if isinstance(value, dict):
            if set(value) == {"@id"}:
                assert value["@id"] in ids, f"Dangling schema reference: {value}"
            for child in value.values():
                check_refs(child)
        elif isinstance(value, list):
            for child in value:
                check_refs(child)

    check_refs(graph)
    org = by_type["Organization"]
    assert org["url"] == ORIGIN + "/"
    assert org["name"] == "Ausstech Consulting Services Pty Ltd"
    assert re.fullmatch(r"\+[1-9]\d{6,14}", org["telephone"])
    assert org["telephone"] == "+61416236105"
    assert org["email"] == "info@auss-tech.com.au"
    assert by_type["WebSite"]["publisher"]["@id"] == org["@id"]
    page = by_type["WebPage"]
    assert page["url"] == canonical
    assert page["name"] == head.titles[0].strip()
    assert page["description"] == head.single("description")
    assert page["isPartOf"]["@id"] == by_type["WebSite"]["@id"]
    if "Service" in by_type:
        service = by_type["Service"]
        assert service["url"] == canonical
        assert service["provider"]["@id"] == org["@id"]
        assert page["about"]["@id"] == service["@id"]
    if is_sydney:
        assert by_type["LocalBusiness"] is org
        assert org["areaServed"] == {"@type": "City", "name": "Sydney"}
        assert org["image"] == IMAGE
        assert service["areaServed"] == org["areaServed"]
        breadcrumb = by_type["BreadcrumbList"]
        assert page["breadcrumb"]["@id"] == breadcrumb["@id"]
        assert breadcrumb["itemListElement"] == [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": ORIGIN + "/"},
            {"@type": "ListItem", "position": 2, "name": "IT Support Sydney", "item": canonical},
        ]
    serialized = json.dumps(schema)
    for placeholder in ["TODO", "ABN to be confirmed", "aggregateRating", "streetAddress"]:
        assert placeholder not in serialized, f"Unsupported/placeholder schema: {placeholder}"
    identity_keys = ["@id", "name", "alternateName", "url", "telephone", "email"]
    return {key: org[key] for key in identity_keys}, by_type["WebSite"]


def validate_sydney_content(content_path, head):
    content = json.loads(content_path.read_text())
    assert content["path"] == "/it-support-sydney/"
    assert content["title"] == head.titles[0].strip()
    assert content["description"] == head.single("description")
    assert content["title"].startswith("IT Support Sydney")
    assert content["h1"].startswith("IT Support Sydney")
    assert content["whyHeading"] == "Why Choose Auss-Tech"
    assert content["guaranteeHeading"] == "Beat Any Written Quote Guarantee"
    assert len(content["faqs"]) >= 6, "At least six FAQs required"
    questions = [faq["question"] for faq in content["faqs"]]
    assert len(set(questions)) == len(questions), "FAQ questions must be unique"
    assert all(faq["answer"].strip() for faq in content["faqs"])
    assert {"/", "/admin-support/"}.issubset(
        {link["href"] for link in content["relatedLinks"]}
    ), "Homepage and admin-support internal links are required"
    text = json.dumps(content).lower()
    for keyword in [
        "business it support sydney",
        "managed it services sydney",
        "microsoft 365 support sydney",
        "cyber security sydney",
        "australian-based support",
    ]:
        assert keyword in text, f"Missing requested topic: {keyword}"
    assert re.search(r"it support company (?:in )?sydney", text)
    assert "sydney metro" in text
    assert "24/7" not in text and "microsoft partner" not in text, "Do not invent service credentials or SLAs"
    print(f"PASS Sydney content: metadata match, H1, requested topics, {len(questions)} FAQs and internal links")
    return content


def validate(root, source=False):
    public = root / "public" if source else root
    robots = (public / "robots.txt").read_text()
    assert not robots.lstrip().startswith("<"), "robots.txt must not be HTML"
    assert "User-agent: *" in robots
    assert f"Sitemap: {ORIGIN}/sitemap.xml" in robots
    policy = RobotFileParser()
    policy.parse(robots.splitlines())
    for bot in ["Googlebot", "bingbot", "Twitterbot", "facebookexternalhit"]:
        for url in [*PAGES.values(), IMAGE]:
            assert policy.can_fetch(bot, url), f"{bot} blocked from {url}"
    sitemap = ET.parse(public / "sitemap.xml")
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    assert sitemap.getroot().tag == "{" + ns["s"] + "}urlset"
    urls = [node.text for node in sitemap.findall("s:url/s:loc", ns)]
    assert len(urls) == len(set(urls)) == len(PAGES)
    assert set(urls) == set(PAGES.values()), "Sitemap must list only canonical marketing pages"
    validate_png(public / "images/social-card.png")
    print(f"PASS robots rules, {len(PAGES)}-URL XML sitemap and 1200x630 PNG")
    identities = []
    for filename, canonical in PAGES.items():
        text = (root / filename).read_text()
        head = Head()
        head.feed(text)
        assert len(head.titles) == 1 and head.titles[0].strip()
        assert head.canonicals == [canonical], "Canonical must be unique and use final HTTPS URL"
        assert set(head.single("robots").split(", ")) >= {"index", "follow"}
        assert head.single("og:type") == "website"
        assert head.single("og:site_name") == "Ausstech Consulting Services"
        assert head.single("og:title") == head.titles[0].strip()
        assert head.single("og:description") == head.single("description")
        assert head.single("og:url") == canonical
        assert head.single("og:locale") == "en_AU"
        assert head.single("og:image") == IMAGE
        assert head.single("og:image:type") == "image/png"
        assert head.single("og:image:width") == "1200"
        assert head.single("og:image:height") == "630"
        assert head.single("og:image:alt")
        assert head.single("twitter:card") == "summary_large_image"
        assert head.single("twitter:title") == head.titles[0].strip()
        assert head.single("twitter:description") == head.single("description")
        assert head.single("twitter:image") == IMAGE
        assert head.single("twitter:image:alt")
        assert "cf-fonts/" not in text and "@font-face" not in text
        for key in ["google-site-verification", "msvalidate.01"]:
            if key in head.metas:
                value = head.single(key).lower()
                assert not any(token in value for token in ["your_", "replace_", "placeholder"]), (
                    "Verification tags require real owner-issued values"
                )
        for asset in head.assets:
            parsed = urlparse(asset)
            assert not parsed.netloc, "Runtime assets must be same-origin"
            assert (root / parsed.path.lstrip("/")).is_file(), f"Missing runtime asset: {asset}"
        identities.append(validate_schema(head, canonical))
        if filename == "it-support-sydney/index.html":
            content_root = root if source else Path(__file__).resolve().parents[1]
            sydney = validate_sydney_content(content_root / "src/content/it-support-sydney.json", head)
            if not source:
                bundled_js = "\n".join(
                    (root / urlparse(asset).path.lstrip("/")).read_text()
                    for asset in head.assets if urlparse(asset).path.endswith(".js")
                )
                for expected_copy in [sydney["h1"], sydney["faqs"][0]["question"], sydney["faqs"][-1]["question"]]:
                    assert expected_copy in bundled_js, "Sydney content missing from generated JS; check stale compiled output"
                print("PASS generated JS includes the Sydney H1 and FAQ content")
        print(f"PASS {filename}: canonical, unique metadata, OG/X tags, JSON-LD graph and assets")
    assert all(identity == identities[0] for identity in identities), (
        "Organization/website identity must match across pages"
    )
    print("PASS consistent organization identity; no placeholder verification tags or local-business address")
    print("Scope: local structural validation, not Google/Bing ownership or rich-result certification.")
    print("NOTE LocalBusiness: no confirmed physical address supplied; Google local-business rich-result eligibility is not claimed.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path("dist"))
    parser.add_argument("--source", action="store_true")
    args = parser.parse_args()
    validate(args.root, args.source)
