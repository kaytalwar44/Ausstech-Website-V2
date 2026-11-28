#!/usr/bin/env python3
"""Regression tests for the technical SEO validator using disposable fixtures."""

from contextlib import redirect_stdout
import io
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
        for folder in ["public", "admin-support"]:
            shutil.copytree(SOURCE / folder, self.root / folder)
        shutil.copy(SOURCE / "index.html", self.root / "index.html")
        (self.root / "src").mkdir()
        shutil.copy(SOURCE / "src/main.tsx", self.root / "src/main.tsx")

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


if __name__ == "__main__":
    unittest.main(verbosity=2)
