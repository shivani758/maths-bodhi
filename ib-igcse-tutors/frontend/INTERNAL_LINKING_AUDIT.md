# Maths Bodhi Internal Linking Audit

Audit date: 2026-05-14  
Scope: homepage, navbar, footer, config-driven route groups, Gurugram pages, board pages, topic/exam pages, conversion CTAs, blog/tutor templates, and sitemap-linked URLs.

## Executive Summary

The internal linking architecture is much stronger than a simple landing-page site. Maths Bodhi now has hub-and-spoke links across board, locality, class, topic, exam, school-intent, and conversion pages. The homepage and Gurugram hub are especially strong.

The remaining issues are mostly quality-control problems:

- 16 SEO config link targets appear missing or unroutable.
- Important board-stage routes are internally linked but missing from sitemap.
- Some locality intents are duplicated between `/city/gurugram/...` and `/gurugram/...`.
- The most-linked pages are heavily concentrated around `/gurugram`, demo, and a few major service pages.
- Some generated long-tail pages may have low rendered inlink depth until verified by a browser crawl.

## Homepage Links

Strong clusters:

- Board routes: CBSE, ICSE, ISC, IGCSE, IB, JEE.
- Class routes: class 6 through class 12 and board-specific class pages.
- Topic routes: algebra, geometry, trigonometry, calculus, statistics, probability, coordinate geometry, functions, number systems, mensuration.
- Service routes: home tutor, online tuition, one-to-one, after-school, weekend, worksheet, doubt-solving, revision.
- Gurugram localities and school-context examples.
- Demo and WhatsApp/callback conversion paths.

Opportunity:

- Add explicit links to missing board subroutes such as IB PYP, IB MYP, IB DP, AA/AI, JEE Main, and JEE Advanced in sitemap and high-level board navigation.

## City To Locality Flow

Current status:

- Navbar links to `/city/gurugram`.
- Footer links to `/city/gurugram`.
- Homepage and Gurugram hub link to major localities.
- Batch A/E locality and society pages exist.

Risks:

- `/city/gurugram/...` and `/gurugram/...` routes overlap. This can split internal equity and confuse canonical intent.
- `/city/gurugram/sector-55` is referenced by board config but not in the sitemap.

Recommendation:

- Use `/gurugram/...` as the high-intent SEO cluster or `/city/gurugram/...` as the canonical city cluster, then consistently cross-link the other only where it has a different purpose.

## Locality To Board Flow

Strong:

- Gurugram hub links from locality cards into board pages.
- Locality pages include related board/card groups.
- Recovery locality-board pages such as `/gurugram/sector-54-cbse-maths-home-tutor` are present in the sitemap.

Watchlist:

- Ensure each locality page has visible links to the top 3-5 board pages relevant to that locality.
- Avoid every locality linking to the same generic board set in the same order.

## Locality To Class Flow

Strong:

- Class 10 and Class 12 Gurugram routes exist.
- Batch B and recovery class-board pages exist.

Gaps:

- Internal static analysis found low direct literal inlinks for some class-board pages.
- Class routes should be featured inside locality pages where class intent is likely, especially Sector 56, Sector 54, Golf Course Road, Sohna Road, and DLF clusters.

## Topic To Board Flow

Strong:

- Topic pages and board-topic pages exist in large quantity.
- Core topic pages link back to home tutor, class, and board pages.

Issues:

- Some old nested topic links are broken or missing:
  - `/cbse-class-10-maths/quadratic-equations`
  - `/igcse-maths/algebra-and-graphs`
  - `/ib-maths/calculus-aa`
  - `/ib-maths/applications-and-interpretation`

Recommendation:

- Replace nested old-style links with current root pages such as `/quadratic-equations-tutor`, `/igcse-algebra-tutor`, `/ib-calculus-tutor`, or create matching nested routes intentionally.

## Exam To Support Flow

Strong:

- JEE, board revision, pre-board, last-minute revision, worksheet, mock/test, and problem-solving pages exist.
- Demo CTA appears consistently.

Issues:

- `/jee-maths/strategy/jee-advanced-maths-problem-solving`
- `/jee-maths/strategy/jee-main-maths-mock-tests`
- `/maths-test-series`
- `/cuet-maths-coaching`

These are referenced but not represented in the sitemap and likely not routed.

## Related Pages Sections

Strengths:

- Config-driven templates support route groups, featured tutors, student results, related blogs, FAQs, and CTA sections.
- Related cards are more useful than flat footer-only internal links.

Risks:

- Generated route groups can create dense repeated link blocks.
- Some generated pages may over-rely on the same central targets:
  - `/gurugram`
  - `/book-demo`
  - `/maths-home-tutor`
  - `/city/gurugram`
  - `/gurugram/cbse-maths-home-tutor`

## CTA Funnel Flow

Strengths:

- Sticky callback CTA is available globally.
- Hero and final CTA sections send users to demo or WhatsApp.
- Tutor pages and blog pages provide contextual next steps.

Watchlist:

- Repeated "Book a free maths demo class" anchors are conversion-friendly but could be diversified with board/locality-specific anchors.
- Use conversion CTAs as a funnel, not as the only internal link type on long-tail pages.

## Weak Link Clusters

Static analysis flags these clusters for rendered crawl verification:

- City alias routes: `/city/gurugram/sector-57`, `/city/gurugram/golf-course-road`, `/city/gurugram/sohna-road`, `/city/gurugram/dlf-phase-4`, `/city/gurugram/dlf-phase-5`, `/city/gurugram/sushant-lok-1`
- Recovery locality-board routes: `/gurugram/{locality}-{board}-maths-home-tutor`
- Recovery class-board routes: `/class-{level}-{board}-maths-home-tutor`
- Topic-board routes: `/cbse-trigonometry-tutor`, `/igcse-algebra-tutor`, `/ib-calculus-tutor`
- School-intent routes for specific Gurugram schools

These are not necessarily true orphans because many links are generated dynamically. They should be validated with a rendered crawl.

## Overlinked Sections

Most frequent static link targets:

| Target | Static mentions |
| --- | ---: |
| `/gurugram` | 125 |
| `/book-demo` | 47 |
| `/maths-home-tutor` | 44 |
| `/city/gurugram` | 38 |
| `/gurugram/cbse-maths-home-tutor` | 33 |
| `/gurugram/igcse-maths-home-tutor` | 33 |
| `/gurugram/ib-maths-home-tutor` | 31 |
| `/book-free-demo-class` | 29 |
| `/cbse-maths-tuition` | 28 |
| `/ib-maths-tuition` | 22 |

Interpretation: this is good for central hub authority, but the next stage should push more equity into subclusters that are currently deeper or weaker.

## Internal Linking Recommendations

1. Fix the 16 missing link targets before deployment.
2. Add the 9 missing board-stage URLs to sitemap and link them from board hubs.
3. Normalize `/city/gurugram/...` versus `/gurugram/...` linking strategy.
4. Add a rendered crawl report with inlink counts after build.
5. Add "related board", "related class", "related topic", and "nearby locality" link blocks to the weakest long-tail templates.
6. Diversify CTA anchor text by page context.
7. Add blog-to-service and blog-to-locality links once published blog content is present.
8. Add dynamic sitemap coverage for published tutor/blog URLs.
