# Maths Bodhi Technical SEO Audit

Audit date: 2026-05-14  
Scope: homepage, Gurugram city/locality routes, board pages, topic pages, exam pages, conversion pages, blog pages, tutor profile pages, routing, metadata, and deployment-related SEO behavior.

## Executive Summary

Maths Bodhi now has a broad SEO architecture with dedicated commercial, board, class, topic, locality, school-intent, and premium society pages. The route architecture is coherent, and most public templates include H1, canonical, meta description, breadcrumbs, FAQs, related pages, tutor modules, result modules, and conversion CTAs.

The strongest technical SEO risks are not content volume; they are rendering and route hygiene:

- Metadata and structured data are injected client-side in `Seo.jsx` using `useEffect`, so initial HTML contains only the generic `index.html` title/description.
- Vercel SPA rewrites send every path to `index.html`, and `NotFound.jsx` does not set `noindex`; missing routes can become soft 404s.
- 16 configured internal link targets appear missing or unroutable.
- 9 high-intent board subroutes are routable but absent from the sitemap.
- `/city/gurugram/...` and `/gurugram/...` pages overlap by locality intent and need a canonical strategy.

## Route And Indexing Health

| Area | Status | Notes |
| --- | --- | --- |
| Homepage | Good | Has one primary H1, rich internal links, Organization/LocalBusiness schema, and conversion CTA. |
| Gurugram hub | Good | Dedicated config route with LocalBusiness schema and route clusters. |
| Locality pages | Mixed | Good coverage, but alias overlap between `/city/gurugram/...` and `/gurugram/...`. |
| Board pages | Mixed | Core board routes exist; 9 IB/JEE subroutes missing from sitemap. |
| Topic pages | Good with watchlist | Many root-level topic pages exist; some old nested topic links are broken. |
| Exam pages | Good with watchlist | Strong JEE/revision coverage; some old nested JEE strategy links are broken. |
| Conversion pages | Good | Demo, fees, home tutor, online, and one-to-one pages exist. |
| Blog pages | Mixed | Blog detail template has SEO and BlogPosting schema, but no static blog URLs in sitemap. |
| Admin pages | Good | Admin login/layout use `noindex, nofollow`. |
| Login/dashboard pages | Watchlist | Public login/dashboard pages use default index behavior unless protected or unreachable. |

## H1/H2/H3 Hierarchy

Findings:

- Public templates generally use a single visible H1 per rendered page.
- `PageHeroSection`, `BoardPageTemplate`, `SeoLandingPage`, `CityPage`, `SectorPage`, `SubjectPage`, `TutorProfile`, and `BlogDetailPage` use clear H1/H2/H3 structure.
- Static code counts show extra H1s in loading states for `BlogDetailPage` and `TutorProfile`, but those are conditional states and not simultaneous with the final content H1.
- Section headings are generally semantic and scan-friendly.

Watchlist:

- Some repeated card headings use H3 heavily, which is acceptable for card grids but should be checked in rendered pages with an accessibility crawler.
- `CityPage.jsx` includes at least one raw `<h3>{classOption}</h3>` without the same class/semantic treatment as surrounding cards.

## Titles And Meta Descriptions

Findings:

- Config-driven pages define `seoTitle` and `seoDescription`.
- Homepage, board pages, SEO landing pages, tutor profiles, blog details, login/demo pages, and admin pages call `Seo`.
- Duplicate-title regex checks flag repeated template strings and repeated labels like "CBSE Maths Home Tutor", but many are generated into unique titles at runtime.

Risks:

- Client-side metadata injection means the server-delivered HTML title remains `Maths Bodhi | Maths Home Tutor in Gurugram` until React hydrates.
- Social bots and some secondary crawlers may not wait for `useEffect` metadata.
- Missing/unroutable internal pages can still render the generic initial title as soft 404s.

## Canonical Tags

Findings:

- `Seo.jsx` writes canonical tags using `canonicalPath` plus `VITE_SITE_URL` fallback.
- Config-driven pages pass `config.canonicalUrl`.
- Blog and tutor detail pages compute canonical paths dynamically.

Risks:

- Canonicals are client-rendered only.
- Overlapping Gurugram aliases should be reviewed so both variants do not self-canonicalize the same intent.
- `NotFound.jsx` does not set a noindex canonical/robots state.

## Internal Linking Structure

Strengths:

- Homepage links to board, class, topic, service, locality, school-context, and demo paths.
- Gurugram hub links to board routes, locality routes, sector routes, service routes, and Batch E pages.
- Config-driven pages include route groups, featured tutors, student results, related blogs, FAQs, and final CTAs.
- Footer links to homepage, Maths by Board, Gurugram, and demo.

Issues:

- 16 internal link targets in `p1SeoPageConfigs.js` appear missing from sitemap and likely unroutable.
- Overlinked central pages include `/gurugram`, `/book-demo`, `/maths-home-tutor`, `/city/gurugram`, and major Gurugram board pages.
- Some generated pages may have low rendered inlink depth unless route groups are visible and crawlable.

## Schema Markup Usage

Implemented:

- Organization and LocalBusiness schema on homepage.
- BreadcrumbList and FAQPage schema via config page schema builder.
- Service, LocalBusiness, and Article-style schema types through `schemaType`.
- BlogPosting schema on blog detail pages.
- FAQ schema on tutor/profile and config pages where FAQ content exists.

Gaps:

- No WebSite schema.
- LocalBusiness schema for config pages is minimal: name, description, URL only.
- Service schema is minimal and does not include provider, areaServed, offers, or audience.
- BlogPosting `mainEntityOfPage` is currently a relative path.

See `SCHEMA_AUDIT.md` for the detailed schema review.

## CTA Placement

Strengths:

- Sticky callback CTA exists globally in `Navbar`.
- Hero actions and final CTA sections appear on config-driven pages.
- Demo flow is linked repeatedly from high-intent pages.
- Tutor and blog detail pages include contextual next actions.

Watchlist:

- Repeated CTA anchor text is strong for conversion but can flatten internal anchor diversity.
- Sticky callback CTA may overlap small mobile viewports and should be checked in rendered mobile QA.

## Crawl Depth

Estimated depth from sitemap paths:

| Path Depth | URL Count |
| --- | ---: |
| 0 | 1 |
| 1 | 272 |
| 2 | 128 |
| 3 | 16 |

This is crawl-friendly. The risk is not path depth; it is whether dynamic route groups expose enough links on rendered pages.

## Mobile Responsiveness

Positive signals:

- Layouts consistently use responsive grids, `flex-wrap`, `min-w-0`, and `overflow-x-hidden`.
- Navbar has desktop and mobile variants.
- Main layout prevents horizontal overflow globally.

Risks:

- Large card grids and long generated H1s should be tested at 360px width.
- Sticky callback CTA needs visual overlap testing on mobile.
- Admin tables/forms are not SEO-critical but may still overflow on small screens.

## Load-Heavy Sections

Observed build output from recent frontend build:

- `ConfigDrivenPageRoute` chunk around 368 kB uncompressed.
- Main `index` chunk around 289 kB uncompressed.
- `mathsContentService` chunk around 71 kB uncompressed.
- CSS around 54 kB uncompressed.

Risk drivers:

- Large static SEO config arrays are bundled into client-side chunks.
- Config-driven route pages can load many route cards, tutors, results, blogs, and FAQ sections.
- Public logo PNG is about 1.44 MB in `public/assets/mathsbodhi-logo.png`.

## Route Collisions And Broken Imports

Build status should be treated as the primary broken-import check. The latest validation build passed for frontend and backend.

Route risks:

- `/:seoSlug` handles one-segment SEO routes only; nested links like `/cbse-class-10-maths/quadratic-equations` do not match a valid content route.
- `NotFound.jsx` under SPA rewrites returns client-side 404 UI but likely HTTP 200 from Vercel.
- `/book-demo` and `/book-free-demo-class` both exist; the sitemap uses `/book-free-demo-class`.

## Noindex Risks

Good:

- Admin routes use `robots="noindex, nofollow"`.

Risks:

- Missing public pages render `NotFound` without `noindex`.
- Login pages and dashboards use SEO defaults unless explicitly noindexed in their components.
- If backend/admin content supplies `seo.indexable=false`, confirm frontend honors it on public CMS-driven pages.

## Weak Or Developer-Facing Copy

Mostly avoided. The current copy is parent/student-facing and domain-specific.

Watchlist:

- Empty tutor states mention backend/data constraints honestly, which is better than fake content, but repeated empty-state copy can feel operational if many generated pages lack real matched profiles.
- Generated page copy should continue to vary by board, locality, class, topic, and school intent to avoid doorway-page perception.

## Priority Technical Fixes

1. Fix the 16 missing internal link targets.
2. Add the 9 board-stage URLs to the sitemap.
3. Add `Seo` with `robots="noindex, nofollow"` to `NotFound.jsx` or configure real 404 handling.
4. Decide canonical ownership for `/city/gurugram/...` versus `/gurugram/...`.
5. Move critical SEO metadata to server-rendered/static HTML generation when feasible, or generate static prerendered pages for top SEO routes.
6. Add WebSite schema and enrich LocalBusiness/Service schema.
7. Add a sitemap generation test that imports or evaluates route config and fails when public paths drift.
