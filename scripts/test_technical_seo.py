#!/usr/bin/env python3
"""Regression tests for the technical SEO validator using disposable fixtures."""

from contextlib import redirect_stdout
import io
import json
from pathlib import Path
import shutil
import tempfile
import unittest

from validate_technical_seo import validate


SOURCE = Path(__file__).resolve().parents[1]


class TechnicalSeoValidationTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        for folder in ["public", "admin-support", "it-support-sydney"]:
            shutil.copytree(SOURCE / folder, self.root / folder)
        shutil.copy(SOURCE / "index.html", self.root / "index.html")
        (self.root / "src").mkdir()
        shutil.copy(SOURCE / "src/main.tsx", self.root / "src/main.tsx")
        shutil.copytree(SOURCE / "src/content", self.root / "src/content")

    def tearDown(self):
        self.tmp.cleanup()

    def check(self):
        with redirect_stdout(io.StringIO()):
            validate(self.root, source=True)

    def replace(self, path, before, after):
        file = self.root / path
        content = file.read_text()
        assert before in content
        file.write_text(content.replace(before, after))

    def test_valid_site_passes(self):
        self.check()

    def test_duplicate_canonical_is_rejected(self):
        self.replace("index.html", "</head>", '<link rel="canonical" href="https://www.auss-tech.com.au/" /></head>')
        with self.assertRaises(AssertionError):
            self.check()

    def test_noncanonical_sitemap_url_is_rejected(self):
        self.replace("public/sitemap.xml", "/admin-support/</loc>", "/admin-support</loc>")
        with self.assertRaises(AssertionError):
            self.check()

    def test_blocked_crawlers_are_rejected(self):
        self.replace("public/robots.txt", "Allow: /", "Disallow: /")
        with self.assertRaises(AssertionError):
            self.check()

    def test_missing_social_tag_is_rejected(self):
        self.replace("index.html", 'name="twitter:card"', 'name="unused:card"')
        with self.assertRaises(AssertionError):
            self.check()

    def test_dangling_schema_reference_is_rejected(self):
        self.replace(
            "index.html",
            '"publisher": { "@id": "https://www.auss-tech.com.au/#organization" }',
            '"publisher": { "@id": "https://www.auss-tech.com.au/#missing" }',
        )
        with self.assertRaises(AssertionError):
            self.check()

    def test_broken_font_reference_is_rejected(self):
        self.replace("index.html", "</head>", '<style>@font-face{src:url(/cf-fonts/missing.woff2)}</style></head>')
        with self.assertRaises(AssertionError):
            self.check()

    def test_corrupted_share_image_is_rejected(self):
        path = self.root / "public/images/social-card.png"
        content = bytearray(path.read_bytes())
        content[30] ^= 1
        path.write_bytes(content)
        with self.assertRaises(AssertionError):
            self.check()

    def mutate_content(self, mutate):
        path = self.root / "src/content/it-support-sydney.json"
        content = json.loads(path.read_text())
        mutate(content)
        path.write_text(json.dumps(content))

    def test_fewer_than_six_sydney_faqs_are_rejected(self):
        self.mutate_content(lambda content: content.update(faqs=content["faqs"][:5]))
        with self.assertRaises(AssertionError):
            self.check()

    def test_missing_admin_internal_link_is_rejected(self):
        self.mutate_content(lambda content: content.update(relatedLinks=content["relatedLinks"][:1]))
        with self.assertRaises(AssertionError):
            self.check()

    def test_missing_local_business_type_is_rejected(self):
        self.replace("it-support-sydney/index.html", '["Organization", "LocalBusiness"]', '"Organization"')
        with self.assertRaises(AssertionError):
            self.check()

    def test_h1_without_primary_keyword_is_rejected(self):
        self.mutate_content(lambda content: content.update(h1="Business technology help"))
        with self.assertRaises(AssertionError):
            self.check()

    def test_sydney_content_metadata_drift_is_rejected(self):
        self.mutate_content(lambda content: content.update(description="Different unreviewed metadata"))
        with self.assertRaises(AssertionError):
            self.check()


if __name__ == "__main__":
    unittest.main(verbosity=2)
