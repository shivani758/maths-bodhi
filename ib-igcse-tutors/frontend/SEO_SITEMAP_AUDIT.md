# Maths Bodhi SEO Sitemap Audit

Audit date: 2026-05-14  
Scope: `frontend/public/sitemap.xml`, route definitions, SEO page config, Gurugram config, and generated recovery clusters.  
Mode: static source audit only. No `.env` files were read.

## Executive Summary

The sitemap is structurally valid XML and contains 417 unique canonical URLs on `https://www.mathsbodhi.in`. It does not contain localhost, staging, Vercel preview, query-string, hash, or duplicate `<loc>` entries.

The recent SEO expansion is mostly reflected correctly: all 292 generated recovery and Batch A/B/C/D/E paths are present in the sitemap, with no duplicate generated cluster paths.

Primary remaining sitemap issues:

- 9 routable board-stage pages exist in `mathsRouteMap` but are missing from the sitemap.
- 16 internal link targets referenced by SEO config are not in the sitemap and appear to be unroutable or missing page configs.
- Several Gurugram locality intents exist as both `/city/gurugram/...` and `/gurugram/...`, creating duplicate-slug and cannibalization risk even though URL entries themselves are unique.
- Blog and tutor profile URLs are dynamic and are not represented in the static sitemap.

## XML And Canonical Checks

| Check | Result |
| --- | --- |
| XML parses successfully | Pass |
| Sitemap namespace present | Pass |
| Total `<loc>` entries | 417 |
| Unique `<loc>` entries | 417 |
| Unique paths | 417 |
| Duplicate `<loc>` entries | 0 |
| Duplicate full paths | 0 |
| Host | `https://www.mathsbodhi.in` only |
| Localhost or `127.0.0.1` URLs | 0 |
| Staging or preview URLs | 0 |
| Query strings or hash fragments | 0 |

## URL Category Breakdown

| Category | URLs |
| --- | ---: |
| Locality | 111 |
| Board | 31 |
| Class | 82 |
| Topic | 65 |
| Exam | 50 |
| Premium society | 10 |
| School-intent | 42 |
| Conversion/support pages | 26 |
| Total | 417 |

## Batch And Recovery Coverage

| Cluster | Configured URLs | Missing From Sitemap |
| --- | ---: | ---: |
| Recovery locality-board pages | 25 | 0 |
| Recovery root SEO pages | 25 | 0 |
| Batch A locality pages | 34 | 0 |
| Batch A root/school pages | 16 | 0 |
| Batch B root pages | 48 | 0 |
| Batch C root pages | 48 | 0 |
| Batch D root pages | 48 | 0 |
| Batch E sector/society pages | 48 | 0 |
| Total generated recovery/Batch A-E paths | 292 | 0 |

This is the biggest sitemap win in the current build: the generated expansion set is complete and internally unique.

## Major Missing Sitemap URLs

These routable board pages exist in `src/data/mathsBoardConfig.js` and are linked from board-page UI, but are not in `sitemap.xml`:

- `/subjects/maths/ib/pyp`
- `/subjects/maths/ib/myp`
- `/subjects/maths/ib/dp`
- `/subjects/maths/ib/dp/aa-hl`
- `/subjects/maths/ib/dp/aa-sl`
- `/subjects/maths/ib/dp/ai-hl`
- `/subjects/maths/ib/dp/ai-sl`
- `/subjects/maths/jee/main`
- `/subjects/maths/jee/advanced`

Impact: these are not spammy pages; they are high-intent curriculum routes and should be discoverable through the sitemap.

## Broken Or Missing Internal Link Targets

The `links` fields in `src/pageSystem/config/p1SeoPageConfigs.js` reference 16 targets that are not in the sitemap. Several are nested paths that are not matched by the current `/:seoSlug` route and are likely soft-404s:

- `/small-group-maths-tuition`
- `/olympiad-maths-coaching`
- `/maths-test-series`
- `/cuet-maths-coaching`
- `/jee-maths/strategy/jee-advanced-maths-problem-solving`
- `/jee-maths/strategy/jee-main-maths-mock-tests`
- `/cbse-class-9-maths/number-systems`
- `/cbse-class-10-maths/quadratic-equations`
- `/cbse-class-11-maths/sets`
- `/cbse-class-12-maths/integrals`
- `/icse-class-9-maths/rational-and-irrational-numbers`
- `/icse-class-10-maths/quadratic-equations`
- `/igcse-maths/algebra-and-graphs`
- `/igcse-maths/probability-and-statistics`
- `/ib-maths/calculus-aa`
- `/ib-maths/applications-and-interpretation`

Impact: users and crawlers can reach dead ends from SEO page route cards. This is the highest-priority sitemap/internal-linking fix.

## Duplicate Slug And Cannibalization Watchlist

There are no duplicate full URLs, but these final slug segments appear on multiple sitemap URLs:

- `gurugram`
- `cbse-maths-home-tutor`
- `igcse-maths-home-tutor`
- `ib-maths-home-tutor`
- `sector-54`
- `sector-56`
- `sector-57`
- `golf-course-road`
- `sohna-road`
- `dlf-phase-4`
- `sushant-lok-1`

Most of this comes from paired routes such as:

- `/city/gurugram`
- `/gurugram`
- `/city/gurugram/sector-54`
- `/gurugram/sector-54`

Impact: this is not a technical duplicate URL error, but it can split ranking signals when pages target the same locality and same intent. Each alias should have a clearly different role or one canonical cluster should be preferred.

## Gurugram Route Coverage

Strong coverage:

- `/gurugram` hub is present.
- Board-local Gurugram pages are present.
- Batch A locality pages are present.
- Batch E sector and premium society pages are present.
- Recovery locality-board pages are present.

Gaps:

- `/city/gurugram/sector-55` is linked in board config but not in sitemap.
- Several `/city/gurugram/...` aliases and `/gurugram/...` pages overlap by locality intent.

## Orphan And Weak-Link Detection

Static literal-link analysis flags many generated pages as weak-inbound candidates because many links are produced dynamically from arrays. This should be verified with a rendered crawl before declaring them true orphans.

High-priority weak-link candidates from static analysis:

- `/city/gurugram/sector-57`
- `/city/gurugram/golf-course-road`
- `/city/gurugram/sohna-road`
- `/city/gurugram/dlf-phase-4`
- `/city/gurugram/dlf-phase-5`
- `/city/gurugram/sushant-lok-1`
- locality-board pages such as `/gurugram/sector-43-cbse-maths-home-tutor`
- class-board pages such as `/class-9-cbse-maths-home-tutor`
- topic-board pages such as `/cbse-trigonometry-tutor`
- school pages such as `/best-maths-home-tutor-for-dav-public-school-sector-14-gurugram`

Recommended next audit: run a rendered crawler over the production build and export inlink counts by route.

## Thin Or Spammy Pattern Check

No obviously broken localhost/staging entries or mechanical duplicate `<loc>` spam was detected.

Watchlist:

- Premium society routes are valuable but should stay factual and avoid implying official school/society affiliation.
- School-intent pages should continue using careful language such as "near", "for families around", and "school-context" rather than endorsement claims.
- High-volume generated pages need real tutor/result/blog modules or honest empty states to avoid doorway-page quality risk.

## Recommended Sitemap Fixes

1. Add the 9 missing board-stage URLs to `sitemap.xml`.
2. Replace or create the 16 missing internal link targets from `p1SeoPageConfigs.js`.
3. Decide canonical strategy for `/city/gurugram/...` versus `/gurugram/...` locality routes.
4. Add a sitemap generation/check script so config paths and sitemap paths cannot drift.
5. Plan a dynamic sitemap source for published blogs and tutor profile pages once backend content is stable.
