# Maths Bodhi Final SEO And Production Scorecard

Audit date: 2026-05-14  
Scope: technical SEO, sitemap, schema, internal linking, performance, deployment, and PostgreSQL migration readiness.

## Scorecards

| Area | Score | Rationale |
| --- | ---: | --- |
| Technical SEO | 78/100 | Strong route/content structure and metadata coverage, held back by client-side-only metadata, soft-404 risk, missing board sitemap routes, and broken internal targets. |
| Internal linking | 74/100 | Strong hub-and-spoke system, but central pages are overlinked and several generated/deep pages need rendered inlink verification. |
| Content architecture | 86/100 | Broad and well-segmented architecture across locality, board, class, topic, exam, school-intent, and society pages. |
| Conversion optimization | 82/100 | Demo and callback paths are strong and consistent; CTA anchor diversity and mobile overlap should be tested. |
| Deployment readiness | 72/100 | Builds pass and docs/scripts exist, but API URL default, soft-404 behavior, and backend `dist` artifact drift are deployment risks. |
| Production readiness | 73/100 | Good foundation, but should not be treated as fully clean until sitemap/link/404/API hygiene is handled. |

## Top Critical Issues

1. 16 internal link targets in SEO config appear missing or unroutable.
2. 9 board-stage routes exist but are absent from the sitemap.
3. `NotFound.jsx` can become a soft 404 under Vercel SPA rewrites and does not set `noindex`.
4. SEO metadata and JSON-LD are injected client-side with `useEffect`.
5. `/city/gurugram/...` and `/gurugram/...` locality routes overlap and need canonical strategy.
6. `VITE_API_URL` must be set in production or frontend falls back to the old Render backend URL.
7. Backend `dist` artifacts are modified after the validation build and need an intentional release decision.
8. Logo PNG is about 1.44 MB.
9. Blog and tutor URLs are dynamic but not represented in a sitemap source.
10. Service and LocalBusiness schema are present but too minimal.

## Top SEO Wins Already Achieved

1. Sitemap has 417 unique canonical production URLs.
2. No duplicate full sitemap URLs.
3. No localhost, staging, or preview URLs in sitemap.
4. All 292 recovery and Batch A/B/C/D/E generated paths are present.
5. Clear topical architecture across locality, board, class, topic, exam, and support pages.
6. Gurugram hub and locality clusters are robust.
7. Config-driven templates standardize title, H1, meta description, canonical, FAQs, CTAs, and related sections.
8. FAQ schema and breadcrumb schema are widely supported.
9. Admin pages use noindex.
10. Frontend and backend builds pass.

## Top 20 Remaining SEO Opportunities

1. Add missing IB/JEE board subroutes to sitemap.
2. Fix missing internal link targets or create intentional route configs for them.
3. Add noindex SEO metadata to NotFound.
4. Add WebSite schema on homepage.
5. Enrich LocalBusiness schema with address, telephone, areaServed, and opening hours.
6. Enrich Service schema with provider, serviceType, audience, and areaServed.
7. Convert BlogPosting `mainEntityOfPage` to absolute URL/object.
8. Add dynamic sitemap generation for published blogs.
9. Add dynamic sitemap generation for published tutor profiles.
10. Normalize `/city/gurugram/...` versus `/gurugram/...` canonical strategy.
11. Add rendered crawler QA for inlink counts.
12. Add sitemap/config drift test.
13. Improve anchor text diversity for CTAs.
14. Add more contextual links from school-intent pages to locality and board pages.
15. Add more topic-to-board and topic-to-class links.
16. Add blog-to-service links once blogs are populated from PostgreSQL.
17. Add lastmod metadata to sitemap if source timestamps become available.
18. Add image alt and optimized image checks to CI/audit.
19. Prerender or server-render the top commercial SEO pages.
20. Add Search Console coverage monitoring after deployment.

## Top 10 Production Risks

1. Broken internal route targets can produce soft 404s.
2. Vercel SPA rewrite can return HTTP 200 for missing pages.
3. Client-side-only metadata can underperform for non-rendering crawlers/social bots.
4. Production frontend may call wrong backend if `VITE_API_URL` is unset.
5. Build artifacts can create noisy or fragile releases if `dist` tracking policy is unclear.
6. Large logo asset can hurt page load and LCP.
7. Alias route cannibalization can split local SEO signals.
8. Dynamic backend blogs/tutors are not represented in sitemap.
9. Generated pages with empty matching data can look thin at scale.
10. CloudPanel env mismatch can break PostgreSQL/session login even if builds pass.

## Top 10 Scaling Recommendations

1. Build a sitemap generator from route/config data.
2. Add route existence tests for every internal link target.
3. Add rendered crawl checks for title, H1, canonical, noindex, and schema.
4. Move SEO metadata to prerendered or server-rendered output for priority pages.
5. Split large SEO config into route-scoped chunks or generated JSON.
6. Add production monitoring for 404/soft-404 and API failures.
7. Add content quality rules for generated pages: unique intro, unique FAQ, relevant links, and honest tutor state.
8. Add dynamic sitemap entries for PostgreSQL-published blogs, tutors, cities, and localities.
9. Add image optimization pipeline for logo and tutor/profile media.
10. Add a deployment checklist that verifies Vercel env, CloudPanel env, schema, seed, db check, health check, and Search Console sitemap submission.
