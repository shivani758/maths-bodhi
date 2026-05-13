import { query } from "../db/postgres.js";
import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slug.js";
import { createFieldErrorDetails } from "../utils/validationDetails.js";
function unique(values = []) {
    return [...new Set(values.filter(Boolean))];
}
function normalizeSegment(value) {
    return slugify(value).trim();
}
function normalizePageKey(pageType, value) {
    const raw = String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/^\/+|\/+$/g, "");
    if (!raw) {
        return "";
    }
    const segments = raw
        .split("/")
        .map((segment) => normalizeSegment(segment))
        .filter(Boolean);
    if (!segments.length) {
        return "";
    }
    return pageType === "subject" ? segments.join("-") : segments.join("/");
}
function buildSourceId(pageType, pageKey) {
    return `page-${pageType}-${pageKey.replaceAll("/", "-")}`;
}
function normalizeRoute(route, pageType, pageKey, slug) {
    const raw = String(route ?? "").trim();
    if (!raw) {
        return pageType === "subject" ? `/subject/${slug}` : `/subjects/maths/${pageKey}`;
    }
    return raw.startsWith("/") ? raw : `/${raw}`;
}
function sanitizeFaqItems(items = []) {
    return (items ?? [])
        .map((item, index) => ({
        id: item?.id || `faq-${index + 1}`,
        question: String(item?.question ?? "").trim(),
        answer: String(item?.answer ?? "").trim(),
    }))
        .filter((item) => item.question || item.answer);
}
function stringArray(value) {
    return Array.isArray(value) ? value.map(String).filter(Boolean) : [];
}
function objectArray(value) {
    return Array.isArray(value)
        ? value.filter((item) => Boolean(item) && typeof item === "object")
        : [];
}
function objectValue(value, fallback) {
    return value && typeof value === "object" && !Array.isArray(value)
        ? value
        : fallback;
}
function toPage(row) {
    const data = row.data ?? {};
    return {
        id: row.id,
        sourceId: row.source_id ?? String(data.sourceId ?? ""),
        pageType: row.page_type,
        pageKey: row.page_key,
        slug: row.slug,
        route: row.route,
        label: row.label,
        title: String(data.title ?? ""),
        navLabel: String(data.navLabel ?? ""),
        h1: String(data.h1 ?? ""),
        intro: String(data.intro ?? ""),
        status: row.status,
        badge: String(data.badge ?? ""),
        heroBadge: String(data.heroBadge ?? ""),
        parentKey: String(data.parentKey ?? ""),
        breadcrumbLabel: String(data.breadcrumbLabel ?? ""),
        chips: stringArray(data.chips),
        stats: objectArray(data.stats),
        supportPanel: objectValue(data.supportPanel, { title: "", text: "", bullets: [] }),
        overview: objectValue(data.overview, { badge: "", title: "", subtitle: "", cards: [] }),
        childSections: objectArray(data.childSections),
        detailSections: objectArray(data.detailSections),
        checklist: stringArray(data.checklist),
        schoolHighlights: objectArray(data.schoolHighlights),
        localZones: objectArray(data.localZones),
        localDemandZones: objectArray(data.localDemandZones),
        cta: objectValue(data.cta, { label: "", description: "" }),
        heroImage: String(data.heroImage ?? ""),
        heroImageAlt: String(data.heroImageAlt ?? ""),
        featuredTutorIds: stringArray(data.featuredTutorIds),
        featuredReviewIds: stringArray(data.featuredReviewIds),
        faqItems: sanitizeFaqItems(Array.isArray(data.faqItems) ? data.faqItems : []),
        relatedCities: stringArray(data.relatedCities),
        boards: stringArray(data.boards),
        topics: stringArray(data.topics),
        outcomes: stringArray(data.outcomes),
        learningApproach: objectArray(data.learningApproach),
        classSegments: objectArray(data.classSegments),
        boardSupportCards: objectArray(data.boardSupportCards),
        searchIntentChips: stringArray(data.searchIntentChips),
        heroStats: objectArray(data.heroStats),
        heroSupportTitle: String(data.heroSupportTitle ?? ""),
        heroSupportText: String(data.heroSupportText ?? ""),
        seoSections: objectArray(data.seoSections),
        parentChecklist: stringArray(data.parentChecklist),
        seo: objectValue(data.seo, {}),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
function serializePage(doc) {
    return {
        id: doc.sourceId || doc.id || "",
        sourceId: doc.sourceId ?? "",
        pageType: doc.pageType,
        pageKey: doc.pageKey ?? "",
        slug: doc.slug ?? "",
        route: doc.route ?? "",
        label: doc.label ?? "",
        title: doc.title ?? "",
        navLabel: doc.navLabel ?? "",
        h1: doc.h1 ?? "",
        intro: doc.intro ?? "",
        status: doc.status,
        badge: doc.badge ?? "",
        heroBadge: doc.heroBadge ?? "",
        parentKey: doc.parentKey ?? "",
        breadcrumbLabel: doc.breadcrumbLabel ?? "",
        chips: doc.chips ?? [],
        stats: doc.stats ?? [],
        supportPanel: doc.supportPanel ?? { title: "", text: "", bullets: [] },
        overview: doc.overview ?? { badge: "", title: "", subtitle: "", cards: [] },
        childSections: doc.childSections ?? [],
        detailSections: doc.detailSections ?? [],
        checklist: doc.checklist ?? [],
        schoolHighlights: doc.schoolHighlights ?? [],
        localZones: doc.localZones ?? [],
        localDemandZones: doc.localDemandZones ?? [],
        cta: doc.cta ?? { label: "", description: "" },
        heroImage: doc.heroImage ?? "",
        heroImageAlt: doc.heroImageAlt ?? "",
        featuredTutorIds: doc.featuredTutorIds ?? [],
        featuredReviewIds: doc.featuredReviewIds ?? [],
        faqItems: doc.faqItems ?? [],
        relatedCities: doc.relatedCities ?? [],
        boards: doc.boards ?? [],
        topics: doc.topics ?? [],
        outcomes: doc.outcomes ?? [],
        learningApproach: doc.learningApproach ?? [],
        classSegments: doc.classSegments ?? [],
        boardSupportCards: doc.boardSupportCards ?? [],
        searchIntentChips: doc.searchIntentChips ?? [],
        heroStats: doc.heroStats ?? [],
        heroSupportTitle: doc.heroSupportTitle ?? "",
        heroSupportText: doc.heroSupportText ?? "",
        seoSections: doc.seoSections ?? [],
        parentChecklist: doc.parentChecklist ?? [],
        seo: doc.seo ?? {},
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}
async function findPageByIdentifier(id) {
    const result = await query(`
      SELECT *
      FROM pages
      WHERE source_id = $1 OR id::text = $1
      LIMIT 1
    `, [id]);
    return result.rows[0] ?? null;
}
async function ensureUniqueRoute(route, identity) {
    const existing = await query(`
      SELECT id
      FROM pages
      WHERE LOWER(route) = LOWER($1)
        AND COALESCE(source_id, id::text) <> $2
      LIMIT 1
    `, [route, identity]);
    if (existing.rows[0]) {
        throw new ApiError(409, "A page with this route already exists.", {
            code: "DUPLICATE_PAGE_ROUTE",
            details: createFieldErrorDetails("route", "A page with this route already exists."),
        });
    }
}
async function ensureSeedPages() {
    return;
}
function buildPersistedPagePayload(payload, existing) {
    const pageType = payload.pageType ?? existing?.pageType ?? "board";
    const nextPageKey = normalizePageKey(pageType, payload.pageKey || payload.slug || existing?.pageKey || existing?.slug || "");
    const nextSlug = pageType === "subject"
        ? normalizePageKey("subject", payload.slug || payload.pageKey || existing?.slug || existing?.pageKey || "")
        : nextPageKey;
    const sourceId = payload.sourceId ||
        existing?.sourceId ||
        buildSourceId(pageType, pageType === "subject" ? nextSlug : nextPageKey);
    const route = normalizeRoute(payload.route ?? existing?.route ?? "", pageType, nextPageKey, nextSlug);
    const label = payload.label ?? existing?.label ?? payload.title ?? existing?.title ?? payload.h1 ?? existing?.h1 ?? "";
    const title = payload.title ?? existing?.title ?? label;
    const navLabel = payload.navLabel ?? existing?.navLabel ?? label;
    const h1 = payload.h1 ?? existing?.h1 ?? label;
    const intro = payload.intro ?? existing?.intro ?? "";
    return {
        id: existing?.id,
        sourceId,
        pageType,
        pageKey: nextPageKey,
        slug: nextSlug,
        route,
        label,
        title,
        navLabel,
        h1,
        intro,
        status: payload.status ?? existing?.status ?? "draft",
        badge: payload.badge ?? existing?.badge ?? "",
        heroBadge: payload.heroBadge ?? existing?.heroBadge ?? "",
        parentKey: payload.parentKey ?? existing?.parentKey ?? "",
        breadcrumbLabel: payload.breadcrumbLabel ?? existing?.breadcrumbLabel ?? label,
        chips: payload.chips ? unique(payload.chips) : existing?.chips ?? [],
        stats: payload.stats ?? existing?.stats ?? [],
        supportPanel: payload.supportPanel ?? existing?.supportPanel ?? { title: "", text: "", bullets: [] },
        overview: payload.overview ?? existing?.overview ?? { badge: "", title: "", subtitle: "", cards: [] },
        childSections: payload.childSections ?? existing?.childSections ?? [],
        detailSections: payload.detailSections ?? existing?.detailSections ?? [],
        checklist: payload.checklist ? unique(payload.checklist) : existing?.checklist ?? [],
        schoolHighlights: payload.schoolHighlights ?? existing?.schoolHighlights ?? [],
        localZones: payload.localZones ?? existing?.localZones ?? [],
        localDemandZones: payload.localDemandZones ?? existing?.localDemandZones ?? [],
        cta: payload.cta ?? existing?.cta ?? { label: "", description: "" },
        heroImage: payload.heroImage ?? existing?.heroImage ?? "",
        heroImageAlt: payload.heroImageAlt ?? existing?.heroImageAlt ?? "",
        featuredTutorIds: payload.featuredTutorIds
            ? unique(payload.featuredTutorIds)
            : existing?.featuredTutorIds ?? [],
        featuredReviewIds: payload.featuredReviewIds
            ? unique(payload.featuredReviewIds)
            : existing?.featuredReviewIds ?? [],
        faqItems: payload.faqItems !== undefined ? sanitizeFaqItems(payload.faqItems) : existing?.faqItems ?? [],
        relatedCities: payload.relatedCities ? unique(payload.relatedCities) : existing?.relatedCities ?? [],
        boards: payload.boards ? unique(payload.boards) : existing?.boards ?? [],
        topics: payload.topics ? unique(payload.topics) : existing?.topics ?? [],
        outcomes: payload.outcomes ? unique(payload.outcomes) : existing?.outcomes ?? [],
        learningApproach: payload.learningApproach ?? existing?.learningApproach ?? [],
        classSegments: payload.classSegments ?? existing?.classSegments ?? [],
        boardSupportCards: payload.boardSupportCards ?? existing?.boardSupportCards ?? [],
        searchIntentChips: payload.searchIntentChips
            ? unique(payload.searchIntentChips)
            : existing?.searchIntentChips ?? [],
        heroStats: payload.heroStats ?? existing?.heroStats ?? [],
        heroSupportTitle: payload.heroSupportTitle ?? existing?.heroSupportTitle ?? "",
        heroSupportText: payload.heroSupportText ?? existing?.heroSupportText ?? "",
        seoSections: payload.seoSections ?? existing?.seoSections ?? [],
        parentChecklist: payload.parentChecklist ? unique(payload.parentChecklist) : existing?.parentChecklist ?? [],
        seo: payload.seo ?? existing?.seo ?? {},
        createdAt: existing?.createdAt,
        updatedAt: existing?.updatedAt,
    };
}
async function insertPage(payload) {
    const result = await query(`
      INSERT INTO pages (source_id, page_type, page_key, slug, route, label, status, data)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [
        payload.sourceId || null,
        payload.pageType,
        payload.pageKey,
        payload.slug,
        payload.route,
        payload.label,
        payload.status,
        payload,
    ]);
    return result.rows[0];
}
async function updatePageRow(id, payload) {
    const result = await query(`
      UPDATE pages
      SET
        source_id = $1,
        page_type = $2,
        page_key = $3,
        slug = $4,
        route = $5,
        label = $6,
        status = $7,
        data = $8
      WHERE id::text = $9
      RETURNING *
    `, [
        payload.sourceId || null,
        payload.pageType,
        payload.pageKey,
        payload.slug,
        payload.route,
        payload.label,
        payload.status,
        payload,
        id,
    ]);
    return result.rows[0] ?? null;
}
export async function listPages() {
    await ensureSeedPages();
    const result = await query("SELECT * FROM pages ORDER BY page_type ASC, updated_at DESC, label ASC");
    return result.rows.map((row) => serializePage(toPage(row)));
}
export async function getPageById(id) {
    await ensureSeedPages();
    const page = await findPageByIdentifier(id);
    if (!page) {
        throw new ApiError(404, "Page not found.", { code: "PAGE_NOT_FOUND" });
    }
    return serializePage(toPage(page));
}
export async function getPublishedPages() {
    await ensureSeedPages();
    const result = await query("SELECT * FROM pages WHERE status = 'published' ORDER BY page_type ASC, route ASC");
    return result.rows.map((row) => serializePage(toPage(row)));
}
export async function createPage(payload) {
    await ensureSeedPages();
    const nextPayload = buildPersistedPagePayload(payload);
    await ensureUniqueRoute(nextPayload.route, nextPayload.sourceId || nextPayload.id || "");
    const page = await insertPage(nextPayload);
    return serializePage(toPage(page));
}
export async function updatePage(id, payload) {
    await ensureSeedPages();
    const page = await findPageByIdentifier(id);
    if (!page) {
        throw new ApiError(404, "Page not found.", { code: "PAGE_NOT_FOUND" });
    }
    const existing = toPage(page);
    const nextPayload = buildPersistedPagePayload(payload, existing);
    await ensureUniqueRoute(nextPayload.route, nextPayload.sourceId || existing.id || id);
    const updated = await updatePageRow(page.id, nextPayload);
    return serializePage(toPage(updated));
}
export async function deletePage(id) {
    await ensureSeedPages();
    const page = await findPageByIdentifier(id);
    if (!page) {
        throw new ApiError(404, "Page not found.", { code: "PAGE_NOT_FOUND" });
    }
    await query("DELETE FROM pages WHERE id::text = $1", [page.id]);
    return serializePage(toPage(page));
}
export async function upsertPageBySourceId(payload) {
    const existing = await query("SELECT * FROM pages WHERE source_id = $1 LIMIT 1", [
        payload.sourceId,
    ]);
    if (existing.rows[0]) {
        return updatePage(existing.rows[0].id, payload);
    }
    return createPage(payload);
}
//# sourceMappingURL=pageService.js.map