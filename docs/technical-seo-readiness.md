# Technical SEO readiness

## Scope

This document covers the public marketing homepage, `/admin-support/` and
`/it-support-sydney/`.
SwiftWorks, platform workflows, authentication, databases, APIs and job/booking
functionality are unchanged.

No production merge/deployment, webmaster account verification or sitemap
submission is authorised by this document.

## Implemented

- `public/robots.txt` allows public crawling and advertises the sitemap.
- `public/sitemap.xml` lists only the three marketing pages.
- Canonical URLs use HTTPS, `www`, and the final trailing-slash paths:
  - `https://www.auss-tech.com.au/`
  - `https://www.auss-tech.com.au/admin-support/`
  - `https://www.auss-tech.com.au/it-support-sydney/`
- Marketing navigation/footer links use the canonical admin-support path.
- Removed broken Cloudflare font-face URLs. The existing system-font fallback
  stack remains; no third-party font request or new font dependency is needed.
- All three HTML entry points have unique descriptions, canonical links, index/follow
  directives, Open Graph and Twitter/X large-image card metadata.
- A real 1200×630 PNG is included at `/images/social-card.png`. The SVG source is
  retained for reproducibility; metadata points to the PNG, not the SVG.
- Organization, WebSite and WebPage JSON-LD is in the initial HTML. The admin page
  also describes the existing administrative/offshore offer using Service.
  The Sydney page adds Service and BreadcrumbList, and types the same business
  identity as both Organization and LocalBusiness.
- Removed the duplicate runtime Helmet metadata/schema block from the marketing
  App. Page selection and visible content are unchanged. This site uses separate
  HTML entry points and full-page navigation, not client-side route transitions.
- No invented verification tokens, social account handles, ABNs, review ratings,
  certifications, opening hours or complete physical address were added.

The homepage and admin page retain Organization markup. The requested Sydney
LocalBusiness markup uses the existing business identity and Sydney service area,
without an invented physical address. Google's LocalBusiness rich-result guidance
requires a physical business address, so Google local-business rich-result
eligibility is not claimed. A confirmed address approved for public use would be
needed before assessing that eligibility. No FAQ rich result is promised.

## Repeatable validation

Run the unchanged production build, then validate its output:

```sh
npm ci
npm run build
python3 scripts/test_technical_seo.py
python3 scripts/validate_technical_seo.py --root dist
git diff --check
```

The dependency-free Python check validates:

- robots parsing and crawl access for Googlebot, bingbot and social crawlers;
- XML namespace, unique sitemap locations and correspondence to canonical pages;
- PNG signature, image dimensions and chunk checksums;
- exactly one title, description, canonical and required social tag per page;
- canonical/Open Graph/schema URL agreement;
- syntactically valid JSON-LD, expected schema types and resolvable graph IDs;
- consistent organization identity and valid E.164-format business phone;
- absence of placeholder/local-address/review claims and invalid font references;
- existence of generated JavaScript/CSS files referenced by each HTML entry.
- presence of the Sydney H1 and FAQ content in generated JavaScript, to detect
  a stale bundle that contains only the previous marketing pages.

Thirteen regression tests cover the valid baseline and intentionally broken
canonicals, sitemap URLs, robots rules, social metadata, JSON-LD references,
font references and PNG checksums, plus Sydney FAQ count, internal links,
LocalBusiness type, H1 targeting and metadata/content drift.

For a source-only preflight before building:

```sh
python3 scripts/validate_technical_seo.py --root . --source
```

This is structural/schema-consistency validation. It is not a claim that Google's
Rich Results Test or Schema.org's hosted validator has approved an unpublished
branch. Run those provider-side checks against the live URLs after an approved
deployment. Valid schema does not guarantee a rich result.

## Google Search Console

**Technically ready after deployment; account ownership/submission not completed.**

1. Use a business-owned Search Console account. Prefer a Domain property for
   `auss-tech.com.au` so HTTP/HTTPS and www/non-www variations are covered.
2. Complete Google's DNS TXT verification using the real record issued to that
   account and access to the domain's DNS. Do not publish a sample token.
3. A URL-prefix property for `https://www.auss-tech.com.au/` is an alternative.
   If an HTML tag/file method is chosen, add the actual Google-issued value/file
   through a separate approved update, retaining it after verification.
4. Submit `https://www.auss-tech.com.au/sitemap.xml`.
5. Inspect all three public URLs. Compare the user-declared and Google-selected
   canonical; check rendered content/resources, indexability and mobile rendering.
6. Review indexing coverage and performance once data is available.

The React page body still needs JavaScript. Google can render JavaScript, but
rendered-content inspection remains necessary. This technical-only PR does not
introduce a framework migration or prerender the visible marketing content.

## Bing Webmaster Tools

**Technically ready after deployment; account ownership/submission not completed.**

1. Use a business-owned Bing Webmaster Tools account.
2. Import a verified Search Console property if appropriate, or use one of Bing's
   actual ownership methods (DNS, issued XML file, or issued HTML verification tag).
3. Submit the same canonical XML sitemap and inspect all three page URLs.
4. Check crawl/indexing reports and whether Bing can retrieve page resources.

No IndexNow API key, webmaster credential, verification value or ownership file
has been invented. IndexNow automation and account connections are outside this PR.

## Post-approval production checks

- Confirm the GitHub Actions build and Pages deployment both succeed.
- Request `/robots.txt`, `/sitemap.xml` and `/images/social-card.png` directly:
  expect HTTP 200 with plain text, XML and PNG content respectively, not an HTML
  fallback or login page.
- Confirm `/admin-support` and `/it-support-sydney` resolve to their trailing-slash
  canonical URLs, and each canonical target itself returns HTTP 200.
- Recheck all three raw HTML heads and rendered DOM for duplicate/overwritten metadata.
- Check the share-image URL from an external network and refresh social preview
  caches if needed; crawler caches may retain previous metadata.
- Inspect rendered content, phone/email links and navigation on mobile and desktop.
- Run Google Rich Results Test and/or Schema.org Validator. Record actual
  provider results rather than assuming local JSON validity equals eligibility.
- Verify webmaster ownership and submit the sitemap only with the account owner.

## Official references

- Google JavaScript SEO: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Bing site verification: https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b
- Bing sitemaps: https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed
