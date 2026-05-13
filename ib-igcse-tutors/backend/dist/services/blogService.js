import { query } from "../db/postgres.js";
import { deleteContentRowById, findContentRowById, } from "../repositories/postgres/contentRepository.js";
import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slug.js";
import { createFieldErrorDetails } from "../utils/validationDetails.js";
function unique(values = []) {
    return [...new Set(values.filter(Boolean))];
}
function toPublishAt(value, fallback = null) {
    if (value === undefined) {
        return fallback;
    }
    return value ? new Date(value) : null;
}
function asFaqItems(value) {
    return Array.isArray(value)
        ? value.map((item) => ({
            question: String(item?.question ?? ""),
            answer: String(item?.answer ?? ""),
        }))
        : [];
}
function toBlog(row) {
    const data = row.data ?? {};
    return {
        id: row.id,
        sourceId: row.source_id ?? String(data.sourceId ?? ""),
        title: row.title,
        slug: row.slug,
        summary: String(data.summary ?? ""),
        body: String(data.body ?? ""),
        category: String(data.category ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        relatedBoards: Array.isArray(data.relatedBoards) ? data.relatedBoards.map(String) : [],
        relatedPageId: String(data.relatedPageId ?? ""),
        relatedTutorIds: Array.isArray(data.relatedTutorIds) ? data.relatedTutorIds.map(String) : [],
        status: row.status,
        publishAt: row.publish_at,
        author: String(data.author ?? "Maths Bodhi Team"),
        coverImage: String(data.coverImage ?? ""),
        faqItems: asFaqItems(data.faqItems),
        seo: data.seo && typeof data.seo === "object" ? data.seo : {},
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
function serializeBlog(doc) {
    return {
        id: doc.id ?? "",
        sourceId: doc.sourceId ?? "",
        title: doc.title,
        slug: doc.slug,
        summary: doc.summary ?? "",
        body: doc.body ?? "",
        category: doc.category ?? "",
        tags: doc.tags ?? [],
        relatedBoards: doc.relatedBoards ?? [],
        relatedPageId: doc.relatedPageId ?? "",
        relatedTutorIds: doc.relatedTutorIds ?? [],
        status: doc.status,
        publishDate: doc.publishAt,
        publishAt: doc.publishAt,
        author: doc.author ?? "Maths Bodhi Team",
        coverImage: doc.coverImage ?? "",
        faqItems: doc.faqItems ?? [],
        seo: doc.seo ?? {},
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}
function buildBlogPayload(payload, existing) {
    return {
        id: existing?.id,
        sourceId: payload.sourceId ?? existing?.sourceId ?? "",
        title: payload.title ?? existing?.title ?? "",
        slug: slugify(payload.slug || existing?.slug || payload.title || existing?.title || ""),
        summary: payload.summary ?? existing?.summary ?? "",
        body: payload.body ?? existing?.body ?? "",
        category: payload.category ?? existing?.category ?? "",
        tags: payload.tags ? unique(payload.tags) : existing?.tags ?? [],
        relatedBoards: payload.relatedBoards ? unique(payload.relatedBoards) : existing?.relatedBoards ?? [],
        relatedPageId: payload.relatedPageId ?? existing?.relatedPageId ?? "",
        relatedTutorIds: payload.relatedTutorIds
            ? unique(payload.relatedTutorIds)
            : existing?.relatedTutorIds ?? [],
        status: payload.status ?? existing?.status ?? "draft",
        publishAt: toPublishAt(payload.publishAt, existing?.publishAt ?? null),
        author: payload.author ?? existing?.author ?? "Maths Bodhi Team",
        coverImage: payload.coverImage ?? existing?.coverImage ?? "",
        faqItems: payload.faqItems ?? existing?.faqItems ?? [],
        seo: payload.seo ?? existing?.seo ?? {},
        createdAt: existing?.createdAt,
        updatedAt: existing?.updatedAt,
    };
}
async function ensureUniqueSlug(slug, excludeId) {
    const existing = await query(`
      SELECT id
      FROM blog_posts
      WHERE LOWER(slug) = LOWER($1)
        AND ($2::text IS NULL OR id::text <> $2)
      LIMIT 1
    `, [slug, excludeId ?? null]);
    if (existing.rows[0]) {
        throw new ApiError(409, "A blog with this slug already exists.", {
            code: "DUPLICATE_BLOG_SLUG",
            details: createFieldErrorDetails("slug", "A blog with this slug already exists."),
        });
    }
}
async function insertBlog(payload) {
    const result = await query(`
      INSERT INTO blog_posts (source_id, title, slug, status, publish_at, data)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [payload.sourceId || null, payload.title, payload.slug, payload.status, payload.publishAt, payload]);
    return result.rows[0];
}
async function updateBlogRow(id, payload) {
    const result = await query(`
      UPDATE blog_posts
      SET
        source_id = $1,
        title = $2,
        slug = $3,
        status = $4,
        publish_at = $5,
        data = $6
      WHERE id::text = $7
      RETURNING *
    `, [payload.sourceId || null, payload.title, payload.slug, payload.status, payload.publishAt, payload, id]);
    return result.rows[0] ?? null;
}
export async function listBlogs() {
    const result = await query("SELECT * FROM blog_posts ORDER BY updated_at DESC");
    return result.rows.map((row) => serializeBlog(toBlog(row)));
}
export async function getBlogById(id) {
    const blog = await findContentRowById("blog_posts", id);
    if (!blog) {
        throw new ApiError(404, "Blog post not found.", { code: "BLOG_NOT_FOUND" });
    }
    return serializeBlog(toBlog(blog));
}
export async function getPublishedBlogs() {
    const result = await query(`
      SELECT *
      FROM blog_posts
      WHERE status = 'published'
      ORDER BY publish_at DESC NULLS LAST, updated_at DESC
    `);
    return result.rows.map((row) => serializeBlog(toBlog(row)));
}
export async function createBlog(payload) {
    const nextPayload = buildBlogPayload(payload);
    await ensureUniqueSlug(nextPayload.slug);
    const blog = await insertBlog(nextPayload);
    return serializeBlog(toBlog(blog));
}
export async function updateBlog(id, payload) {
    const blog = await findContentRowById("blog_posts", id);
    if (!blog) {
        throw new ApiError(404, "Blog post not found.", { code: "BLOG_NOT_FOUND" });
    }
    const nextPayload = buildBlogPayload(payload, toBlog(blog));
    await ensureUniqueSlug(nextPayload.slug, id);
    const updated = await updateBlogRow(id, nextPayload);
    return serializeBlog(toBlog(updated));
}
export async function deleteBlog(id) {
    const blog = await deleteContentRowById("blog_posts", id);
    if (!blog) {
        throw new ApiError(404, "Blog post not found.", { code: "BLOG_NOT_FOUND" });
    }
    return serializeBlog(toBlog(blog));
}
export async function upsertBlogBySourceId(payload) {
    const existing = await query("SELECT * FROM blog_posts WHERE source_id = $1 LIMIT 1", [
        payload.sourceId,
    ]);
    if (existing.rows[0]) {
        return updateBlog(existing.rows[0].id, payload);
    }
    return createBlog(payload);
}
//# sourceMappingURL=blogService.js.map