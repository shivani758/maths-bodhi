import { query } from "../db/postgres.js";
import {
  deleteContentRowById,
  findContentRowById,
  type ContentRow,
} from "../repositories/postgres/contentRepository.js";
import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slug.js";
import { createFieldErrorDetails } from "../utils/validationDetails.js";

type BlogPayload = {
  sourceId?: string;
  title?: string;
  slug?: string;
  summary?: string;
  body?: string;
  category?: string;
  tags?: string[];
  relatedBoards?: string[];
  relatedPageId?: string;
  relatedTutorIds?: string[];
  status?: "draft" | "published" | "scheduled";
  publishAt?: string | Date | null;
  author?: string;
  coverImage?: string;
  faqItems?: Array<{ question: string; answer: string }>;
  seo?: Record<string, unknown>;
};

type BlogRow = ContentRow & {
  title: string;
  slug: string;
  status: "draft" | "published" | "scheduled";
  publish_at: Date | null;
};

type PersistedBlog = {
  id?: string;
  sourceId: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  category: string;
  tags: string[];
  relatedBoards: string[];
  relatedPageId: string;
  relatedTutorIds: string[];
  status: "draft" | "published" | "scheduled";
  publishAt: Date | null;
  author: string;
  coverImage: string;
  faqItems: Array<{ question: string; answer: string }>;
  seo: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
};

function unique(values: string[] = []) {
  return [...new Set(values.filter(Boolean))];
}

function toPublishAt(value: string | Date | null | undefined, fallback: Date | null = null) {
  if (value === undefined) {
    return fallback;
  }

  return value ? new Date(value) : null;
}

function asFaqItems(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => ({
        question: String((item as { question?: unknown })?.question ?? ""),
        answer: String((item as { answer?: unknown })?.answer ?? ""),
      }))
    : [];
}

function toBlog(row: BlogRow): PersistedBlog {
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
    seo: data.seo && typeof data.seo === "object" ? (data.seo as Record<string, unknown>) : {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function serializeBlog(doc: PersistedBlog) {
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

function buildBlogPayload(payload: BlogPayload, existing?: PersistedBlog): PersistedBlog {
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

async function ensureUniqueSlug(slug: string, excludeId?: string) {
  const existing = await query<{ id: string }>(
    `
      SELECT id
      FROM blog_posts
      WHERE LOWER(slug) = LOWER($1)
        AND ($2::text IS NULL OR id::text <> $2)
      LIMIT 1
    `,
    [slug, excludeId ?? null],
  );

  if (existing.rows[0]) {
    throw new ApiError(409, "A blog with this slug already exists.", {
      code: "DUPLICATE_BLOG_SLUG",
      details: createFieldErrorDetails("slug", "A blog with this slug already exists."),
    });
  }
}

async function insertBlog(payload: PersistedBlog) {
  const result = await query<BlogRow>(
    `
      INSERT INTO blog_posts (source_id, title, slug, status, publish_at, data)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
    [payload.sourceId || null, payload.title, payload.slug, payload.status, payload.publishAt, payload],
  );

  return result.rows[0];
}

async function updateBlogRow(id: string, payload: PersistedBlog) {
  const result = await query<BlogRow>(
    `
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
    `,
    [payload.sourceId || null, payload.title, payload.slug, payload.status, payload.publishAt, payload, id],
  );

  return result.rows[0] ?? null;
}

export async function listBlogs() {
  const result = await query<BlogRow>("SELECT * FROM blog_posts ORDER BY updated_at DESC");
  return result.rows.map((row) => serializeBlog(toBlog(row)));
}

export async function getBlogById(id: string) {
  const blog = await findContentRowById<BlogRow>("blog_posts", id);

  if (!blog) {
    throw new ApiError(404, "Blog post not found.", { code: "BLOG_NOT_FOUND" });
  }

  return serializeBlog(toBlog(blog));
}

export async function getPublishedBlogs() {
  const result = await query<BlogRow>(
    `
      SELECT *
      FROM blog_posts
      WHERE status = 'published'
      ORDER BY publish_at DESC NULLS LAST, updated_at DESC
    `,
  );
  return result.rows.map((row) => serializeBlog(toBlog(row)));
}

export async function createBlog(payload: BlogPayload) {
  const nextPayload = buildBlogPayload(payload);
  await ensureUniqueSlug(nextPayload.slug);
  const blog = await insertBlog(nextPayload);

  return serializeBlog(toBlog(blog));
}

export async function updateBlog(id: string, payload: BlogPayload) {
  const blog = await findContentRowById<BlogRow>("blog_posts", id);

  if (!blog) {
    throw new ApiError(404, "Blog post not found.", { code: "BLOG_NOT_FOUND" });
  }

  const nextPayload = buildBlogPayload(payload, toBlog(blog));
  await ensureUniqueSlug(nextPayload.slug, id);
  const updated = await updateBlogRow(id, nextPayload);

  return serializeBlog(toBlog(updated!));
}

export async function deleteBlog(id: string) {
  const blog = await deleteContentRowById<BlogRow>("blog_posts", id);

  if (!blog) {
    throw new ApiError(404, "Blog post not found.", { code: "BLOG_NOT_FOUND" });
  }

  return serializeBlog(toBlog(blog));
}

export async function upsertBlogBySourceId(payload: BlogPayload & { sourceId: string }) {
  const existing = await query<BlogRow>("SELECT * FROM blog_posts WHERE source_id = $1 LIMIT 1", [
    payload.sourceId,
  ]);

  if (existing.rows[0]) {
    return updateBlog(existing.rows[0].id, payload);
  }

  return createBlog(payload);
}
