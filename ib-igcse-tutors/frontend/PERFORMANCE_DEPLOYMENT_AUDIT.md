# Maths Bodhi Performance And Deployment Audit

Audit date: 2026-05-14  
Scope: Vite build behavior, bundle risk, static assets, route rendering, mobile layout risks, Linux/Vercel sensitivity, frontend/backend deployment readiness, and PostgreSQL migration impact.

## Executive Summary

The app builds successfully and is deployable, but production readiness still has notable hygiene risks:

- Static SEO data creates large client chunks.
- `public/assets/mathsbodhi-logo.png` is about 1.44 MB.
- `apiClient.js` defaults to an old Render backend URL unless `VITE_API_URL` is set.
- Vercel SPA rewrites can produce soft 404s for missing routes.
- SEO metadata is client-side only.
- Backend `dist` artifacts are modified after the validation build and need an intentional release decision.

No backend logic changes were made during this audit.

## Bundle Size Risk

Recent observed frontend build output:

| Asset/Chunk | Approx Size |
| --- | ---: |
| `ConfigDrivenPageRoute` JS | 368.52 kB |
| Main `index` JS | 289.39 kB |
| `mathsContentService` JS | 70.90 kB |
| Main CSS | 54.39 kB |

Risk:

- Config-driven SEO pages bundle large arrays and rendering logic into client-side chunks.
- Long-tail route expansion increases JavaScript parse/evaluation cost.

Recommendations:

- Keep route-level code splitting.
- Consider generated static JSON or build-time route manifests instead of shipping all SEO config to every client route.
- Track gzip and brotli sizes in CI.

## Large Config Arrays

High-volume config modules:

- `src/pageSystem/config/seoRecoveryCluster.js`
- `src/pageSystem/config/p1SeoPageConfigs.js`
- `src/pageSystem/config/staticPageConfigs.js`
- `src/data/mathsBoardConfig.js`

Risk:

- Large config modules can increase initial or route-level bundle work.
- Dynamic generated pages are hard to audit manually.

Recommendation:

- Add a config audit script that outputs total route count, duplicate paths, missing sitemap entries, and broken internal links.

## Route Rendering Performance

Strengths:

- Lazy-loaded route components are used in `App.jsx`.
- Public templates share components and avoid deeply nested bespoke route components.

Risks:

- Config-driven pages can render multiple heavy sections: route groups, tutors, student results, related blogs, FAQs, and CTA.
- Repeated arrays and filtering across page data may become expensive as backend content grows.

Recommendations:

- Memoize expensive page filtering/selectors where needed.
- Cap initial visible route cards and tutor cards.
- Measure interaction and hydration time on mobile devices.

## Mobile Overflow Risk

Positive:

- `MainLayout` uses `overflow-x-hidden`.
- Navbar uses wrapping and breakpoint-specific layouts.
- Most page sections use responsive grids.

Watchlist:

- Long H1s on generated pages.
- Repeated pill/route-card groups.
- Sticky callback CTA at the bottom of mobile screens.
- Admin tables/forms on smaller screens.

Recommendation:

- Run Playwright or browser QA at 360x740, 390x844, 768x1024, and desktop widths.

## Repeated Rendering Blocks

The current page system repeats similar blocks across hundreds of generated pages:

- Hero
- Support points
- Route groups
- Featured tutors
- Student results
- Related blogs
- FAQ
- CTA

This is good for consistency but should be monitored for:

- Repeated copy patterns.
- Too many internal links per page.
- Slow rendering when backend data grows.

## Image And Logo Optimization

Largest public asset:

- `public/assets/mathsbodhi-logo.png`: about 1.44 MB.

Risk:

- The logo is used in header/footer/admin and lives in `public`, so Vite will not optimize it automatically.
- Large logo can hurt LCP/transfer cost if loaded eagerly.

Recommendations:

- Replace with optimized SVG or compressed WebP/PNG.
- Serve width/height constrained variants where possible.
- Keep favicon and hero SVGs lightweight.

## Lazy Loading Opportunities

Already good:

- Most route pages are lazy-loaded in `App.jsx`.

Potential:

- Lazy-load below-fold tutor/result/blog sections on large generated pages.
- Lazy-load non-critical admin pages.
- Consider image lazy-loading for tutor/profile images if not already handled by browser defaults.

## Vercel And Linux Case Sensitivity Risks

Build passed, so no current import-case failure was detected.

Watchlist:

- Windows development can hide case mismatches that Linux will reject.
- `forceConsistentCasingInFileNames` exists in backend TypeScript, but frontend JS relies on Vite/esbuild behavior.
- Keep route/file names consistent, especially `home.jsx`, `SeoLandingPage.jsx`, and template imports.

## Vercel SPA Rewrite Risk

`vercel.json` rewrites every path to `/index.html`.

Risk:

- Missing routes can return HTTP 200 with a client-side NotFound page.
- `NotFound.jsx` does not inject noindex metadata.

Recommendation:

- Add explicit noindex to `NotFound.jsx`.
- Consider static prerender or edge handling for important 404s if SEO crawl quality becomes a concern.

## API Deployment Risk

`src/services/apiClient.js` default:

```text
https://maths-nxtutors-backend.onrender.com
```

Risk:

- If `VITE_API_URL` is not set in production, frontend will call the old/default Render backend rather than the intended CloudPanel/PostgreSQL backend.

Recommendation:

- Set `VITE_API_URL` explicitly in Vercel/frontend production environment.
- Keep backend `FRONTEND_ORIGIN` and session cookie settings aligned with the deployed frontend domain.

## CloudPanel Backend Readiness

Backend deployment docs exist:

- `backend/CLOUDPANEL_DEPLOY.md`

The doc covers:

- CloudPanel
- PM2
- required env variables
- schema command
- `npm run db:check`
- seed command
- health check
- rollback notes

Backend scripts verified in `package.json`:

- `build`
- `start`
- `seed`
- `db:check`

## Git And Repository Hygiene

Final hygiene check:

- `.env` files are not staged or modified by this audit.
- `node_modules` is present locally but not tracked or staged.
- Backend `dist` files are modified after `npm run build`.

Recommendations:

- Do not use `git add .`; stage exact files.
- Confirm whether `frontend/dist` and `backend/dist` should be tracked or ignored for the deployment model.
- If backend `dist` is tracked for deployment, commit the generated artifact changes intentionally. If not, stop tracking it in a separate cleanup.

## Deployment Readiness Verdict

Build readiness: pass after validation builds.  
SEO deployment readiness: pass with warnings.  
Production readiness: not fully clean until the broken internal links, missing sitemap board routes, soft-404 behavior, API URL, large logo, and backend `dist` release-policy risk are addressed.

## Recommended Deployment Checklist

1. Fix or intentionally remove the 16 missing internal link targets.
2. Add the 9 missing board-stage sitemap URLs.
3. Set frontend `VITE_API_URL` to the intended production backend.
4. Apply PostgreSQL schema on CloudPanel.
5. Run backend `npm run db:check`.
6. Run backend `npm run seed`.
7. Run frontend and backend builds.
8. Verify `/api/health`.
9. Render-check homepage, `/gurugram`, a locality page, a board page, a topic page, an exam page, and demo page.
10. Submit sitemap in Google Search Console after deployment.
