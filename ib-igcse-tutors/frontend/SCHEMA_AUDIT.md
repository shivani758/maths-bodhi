# Maths Bodhi Structured Data And Schema Audit

Audit date: 2026-05-14  
Scope: `Seo.jsx`, homepage schema, config-driven schema builder, SEO landing pages, board pages, blog pages, subject pages, tutor profiles, contact constants, and public settings defaults.

## Executive Summary

Structured data coverage is solid for core page types but still shallow in several schema objects. The site has Organization, LocalBusiness, BreadcrumbList, FAQPage, Service, CollectionPage, Article-like pages, and BlogPosting usage. The highest-impact improvement is to enrich LocalBusiness and Service schema with consistent provider, address, telephone, areaServed, offers, and page-specific service context.

## Existing Schema

| Schema Type | Where Found | Notes |
| --- | --- | --- |
| Organization | Homepage, blog author, subject page | Uses Maths Bodhi as publisher/provider. |
| LocalBusiness | Homepage and config-driven locality/city pages | Homepage version includes phone. Config-driven version is minimal. |
| FAQPage | Config-driven pages, SEO landing pages, tutor profile, subject page | Good coverage when FAQ content exists. |
| BreadcrumbList | Config-driven pages, SEO landing pages, subject page | Good for route hierarchy and page context. |
| BlogPosting | Blog detail page | Good baseline for blogs. |
| Service | Many config-driven service pages | Present but minimal. |
| CollectionPage | Board/curriculum hubs | Present as default schema type, but often skipped by schema builder if default. |
| WebSite | Not found | Missing opportunity. |

## Schema Implementation Notes

`src/components/Seo.jsx` injects all schema through one `application/ld+json` script with id `seo-structured-data`.

Strengths:

- Schema is centralized and consistent.
- Pages can pass multiple schema objects.
- Canonical URL base uses `VITE_SITE_URL` with `https://www.mathsbodhi.in` fallback.
- FAQ and breadcrumb schema are generated automatically from page config.

Risks:

- Schema is client-side only because it is written in `useEffect`.
- Some schema objects are minimal and may not provide enough entity clarity.
- One schema script is replaced per route, which is correct for SPA navigation but still dependent on hydration.

## Organization Schema

Current coverage:

- Homepage includes Organization schema.
- Blog author uses Organization.
- Subject page references Organization.

Recommended additions:

- Add `url`, `logo`, `sameAs`, `contactPoint`, and `areaServed`.
- Keep phone and address aligned with `src/constants/contact.js` and public site settings.
- Include `founder` or `brand` only if factually verified.

## LocalBusiness Schema

Current coverage:

- Homepage includes LocalBusiness with Maths Bodhi contact details.
- Gurugram hub and locality pages use `schemaType: "LocalBusiness"` through `buildConfigPageSchema`.

Issue:

- Config-driven LocalBusiness schema currently emits only `@type`, `name`, `description`, and `url`.

Recommended additions:

- `telephone`
- `address`
- `areaServed`
- `priceRange`
- `openingHoursSpecification`
- `image`
- `parentOrganization` or `provider`
- `sameAs` if official profiles exist

## FAQ Schema

Current coverage:

- Config pages include FAQPage when `sections.faqs` or entity FAQ items exist.
- SEO landing pages include FAQPage.
- Tutor profiles include FAQPage when FAQ content exists.

Quality notes:

- FAQ questions are relevant and mostly non-spammy.
- Generated FAQ content should remain page-specific; avoid identical FAQ sets across large clusters.
- Ensure FAQ text exactly matches visible page FAQ content.

## Breadcrumb Schema

Current coverage:

- Config-driven pages build BreadcrumbList from `breadcrumbItems`.
- SEO landing and subject pages also include breadcrumb schema.

Issue:

- Breadcrumb item URLs are generated with `new URL`, which is good, but alias routes should be reviewed so breadcrumbs point to the preferred canonical cluster.

## WebSite Schema

Status: missing.

Opportunity:

- Add WebSite schema on homepage with `name`, `url`, and optional `potentialAction` only if an actual search route exists.
- If no internal site search exists, do not fake SearchAction.

## Article And Blog Schema

Current coverage:

- Blog detail page emits `BlogPosting`.
- Some Batch D resource/exam guide pages use `schemaType: "Article"` through config.

Issues:

- BlogPosting `mainEntityOfPage` is currently a relative path such as `/blogs/{slug}`. Prefer an absolute URL or `WebPage` object.
- Blog sitemap coverage is absent for dynamic published blogs.
- Add `dateModified` when available.

## Contact And Phone Consistency

Contact values are centralized in:

- `src/constants/contact.js`
- `src/services/publicSiteService.js`
- `src/services/mockCmsStore.js`

Observed public values:

- Phone display: `+91 8796499818`
- WhatsApp number: `918796499818`
- Support email fallback: `support@mathsbodhi.in`

Consistency status:

- Good: homepage, footer, WhatsApp utilities, public settings, and mock store use shared constants.
- Watchlist: admin-editable settings can override display values; production should keep them consistent with schema and visible footer.

## Invalid Schema Risks

No hard invalid JSON-LD syntax was found in static source review.

Potential validation warnings:

- Minimal LocalBusiness objects may be considered incomplete.
- Service schema may lack `provider`, `areaServed`, and `serviceType`.
- BlogPosting `mainEntityOfPage` should be absolute.
- Client-side-only schema may not be visible to all crawlers/tools without rendering.

## High-Impact Schema Opportunities

1. Add WebSite schema to homepage.
2. Enrich LocalBusiness schema for Gurugram hub and locality pages.
3. Enrich Service schema for board, class, topic, exam, and conversion pages.
4. Add `provider` as Organization for all Service schema.
5. Add `areaServed` for Gurugram and locality pages.
6. Add `audience` for parent/student/board-specific pages.
7. Add `dateModified` and absolute `mainEntityOfPage` to BlogPosting.
8. Add `image` and `logo` fields using optimized assets.
9. Validate rendered JSON-LD with Rich Results Test or schema validator after deployment.
10. Keep school and society schema conservative; do not imply official affiliation.
