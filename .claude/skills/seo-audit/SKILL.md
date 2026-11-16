---
name: seo-audit
description: Audit a web page or site (URL or source files) for on-page and technical SEO issues and return prioritized fixes. Use when the user asks to check, audit, or improve SEO of a page/site.
---
# SEO Audit

Check and score each area (pass / warn / fail):
- **On-page**: title, meta description, single H1, heading hierarchy, keyword usage, content depth, image alt text, internal links.
- **Technical**: indexability (robots meta, robots.txt), canonical tags, sitemap, HTTPS, mobile viewport, page speed hints (image sizes, render-blocking scripts), broken links.
- **Structured data**: present schema types, validity, opportunities.
- **Content**: intent match, E-E-A-T signals, freshness.

Output `deliverables/seo/audit-<site>.md`: summary score, then a table `issue | location | impact (H/M/L) | effort (H/M/L) | fix`, sorted by impact then effort.
