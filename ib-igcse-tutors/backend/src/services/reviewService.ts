import { query } from "../db/postgres.js";
import {
  deleteContentRowById,
  findContentRowById,
  type ContentRow,
} from "../repositories/postgres/contentRepository.js";
import { ApiError } from "../utils/ApiError.js";

type ReviewPayload = {
  sourceId?: string;
  reviewerName?: string;
  reviewerType?: string;
  text?: string;
  rating?: number;
  linkedTutorId?: string;
  linkedBoard?: string;
  linkedPage?: string;
  city?: string;
  locality?: string;
  school?: string;
  featured?: boolean;
  moderationStatus?: "draft" | "pending" | "approved" | "archived";
  anonymized?: boolean;
  featuredOn?: string[];
  order?: number;
};

type ReviewRow = ContentRow & {
  reviewer_name: string;
  moderation_status: "draft" | "pending" | "approved" | "archived";
  featured: boolean;
  order_index: number;
  linked_tutor_id: string;
  linked_board: string;
  city: string;
};

type PersistedReview = {
  id?: string;
  sourceId: string;
  reviewerName: string;
  reviewerType: string;
  text: string;
  rating: number;
  linkedTutorId: string;
  linkedBoard: string;
  linkedPage: string;
  city: string;
  locality: string;
  school: string;
  featured: boolean;
  moderationStatus: "draft" | "pending" | "approved" | "archived";
  anonymized: boolean;
  featuredOn: string[];
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
};

function unique(values: string[] = []) {
  return [...new Set(values.filter(Boolean))];
}

function toReview(row: ReviewRow): PersistedReview {
  const data = row.data ?? {};

  return {
    id: row.id,
    sourceId: row.source_id ?? String(data.sourceId ?? ""),
    reviewerName: row.reviewer_name,
    reviewerType: String(data.reviewerType ?? "Parent"),
    text: String(data.text ?? ""),
    rating: Number(data.rating ?? 5),
    linkedTutorId: row.linked_tutor_id ?? "",
    linkedBoard: row.linked_board ?? "",
    linkedPage: String(data.linkedPage ?? ""),
    city: row.city ?? "gurugram",
    locality: String(data.locality ?? ""),
    school: String(data.school ?? ""),
    featured: row.featured,
    moderationStatus: row.moderation_status,
    anonymized: Boolean(data.anonymized),
    featuredOn: Array.isArray(data.featuredOn) ? data.featuredOn.map(String) : [],
    order: row.order_index,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function serializeReview(doc: PersistedReview) {
  return {
    id: doc.id ?? "",
    sourceId: doc.sourceId ?? "",
    reviewerName: doc.reviewerName,
    roleType: doc.reviewerType,
    reviewerType: doc.reviewerType,
    reviewText: doc.text,
    text: doc.text,
    rating: doc.rating,
    relatedTutorId: doc.linkedTutorId || "",
    linkedTutorId: doc.linkedTutorId || "",
    relatedBoard: doc.linkedBoard ?? "",
    linkedBoard: doc.linkedBoard ?? "",
    relatedPageId: doc.linkedPage ?? "",
    linkedPage: doc.linkedPage ?? "",
    city: doc.city ?? "gurugram",
    locality: doc.locality ?? "",
    school: doc.school ?? "",
    status: doc.moderationStatus,
    moderationStatus: doc.moderationStatus,
    featured: Boolean(doc.featured),
    featuredOn: doc.featuredOn ?? [],
    order: doc.order ?? 99,
    anonymized: Boolean(doc.anonymized),
    parent: doc.reviewerName,
    sector: doc.locality ?? "",
    board: doc.linkedBoard ?? "",
    quote: doc.text,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function buildReviewPayload(payload: ReviewPayload, existing?: PersistedReview): PersistedReview {
  return {
    id: existing?.id,
    sourceId: payload.sourceId ?? existing?.sourceId ?? "",
    reviewerName: payload.reviewerName ?? existing?.reviewerName ?? "",
    reviewerType: payload.reviewerType ?? existing?.reviewerType ?? "Parent",
    text: payload.text ?? existing?.text ?? "",
    rating: payload.rating ?? existing?.rating ?? 5,
    linkedTutorId: payload.linkedTutorId ?? existing?.linkedTutorId ?? "",
    linkedBoard: payload.linkedBoard ?? existing?.linkedBoard ?? "",
    linkedPage: payload.linkedPage ?? existing?.linkedPage ?? "",
    city: payload.city ?? existing?.city ?? "gurugram",
    locality: payload.locality ?? existing?.locality ?? "",
    school: payload.school ?? existing?.school ?? "",
    featured: payload.featured ?? existing?.featured ?? false,
    moderationStatus: payload.moderationStatus ?? existing?.moderationStatus ?? "pending",
    anonymized: payload.anonymized ?? existing?.anonymized ?? false,
    featuredOn: payload.featuredOn ? unique(payload.featuredOn) : existing?.featuredOn ?? [],
    order: payload.order ?? existing?.order ?? 99,
    createdAt: existing?.createdAt,
    updatedAt: existing?.updatedAt,
  };
}

async function insertReview(payload: PersistedReview) {
  const result = await query<ReviewRow>(
    `
      INSERT INTO reviews (
        source_id,
        reviewer_name,
        moderation_status,
        featured,
        order_index,
        linked_tutor_id,
        linked_board,
        city,
        data
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `,
    [
      payload.sourceId || null,
      payload.reviewerName,
      payload.moderationStatus,
      payload.featured,
      payload.order,
      payload.linkedTutorId,
      payload.linkedBoard,
      payload.city,
      payload,
    ],
  );

  return result.rows[0];
}

async function updateReviewRow(id: string, payload: PersistedReview) {
  const result = await query<ReviewRow>(
    `
      UPDATE reviews
      SET
        source_id = $1,
        reviewer_name = $2,
        moderation_status = $3,
        featured = $4,
        order_index = $5,
        linked_tutor_id = $6,
        linked_board = $7,
        city = $8,
        data = $9
      WHERE id::text = $10
      RETURNING *
    `,
    [
      payload.sourceId || null,
      payload.reviewerName,
      payload.moderationStatus,
      payload.featured,
      payload.order,
      payload.linkedTutorId,
      payload.linkedBoard,
      payload.city,
      payload,
      id,
    ],
  );

  return result.rows[0] ?? null;
}

export async function listReviews() {
  const result = await query<ReviewRow>("SELECT * FROM reviews ORDER BY order_index ASC, updated_at DESC");
  return result.rows.map((row) => serializeReview(toReview(row)));
}

export async function getReviewById(id: string) {
  const review = await findContentRowById<ReviewRow>("reviews", id);

  if (!review) {
    throw new ApiError(404, "Review not found.", { code: "REVIEW_NOT_FOUND" });
  }

  return serializeReview(toReview(review));
}

export async function getApprovedReviews() {
  const result = await query<ReviewRow>(
    `
      SELECT *
      FROM reviews
      WHERE moderation_status = 'approved'
      ORDER BY order_index ASC, updated_at DESC
    `,
  );
  return result.rows.map((row) => serializeReview(toReview(row)));
}

export async function createReview(payload: ReviewPayload) {
  const review = await insertReview(buildReviewPayload(payload));

  return serializeReview(toReview(review));
}

export async function updateReview(id: string, payload: ReviewPayload) {
  const review = await findContentRowById<ReviewRow>("reviews", id);

  if (!review) {
    throw new ApiError(404, "Review not found.", { code: "REVIEW_NOT_FOUND" });
  }

  const updated = await updateReviewRow(id, buildReviewPayload(payload, toReview(review)));
  return serializeReview(toReview(updated!));
}

export async function deleteReview(id: string) {
  const review = await deleteContentRowById<ReviewRow>("reviews", id);

  if (!review) {
    throw new ApiError(404, "Review not found.", { code: "REVIEW_NOT_FOUND" });
  }

  return serializeReview(toReview(review));
}

export async function upsertReviewBySourceId(payload: ReviewPayload & { sourceId: string }) {
  const existing = await query<ReviewRow>("SELECT * FROM reviews WHERE source_id = $1 LIMIT 1", [
    payload.sourceId,
  ]);

  if (existing.rows[0]) {
    return updateReview(existing.rows[0].id, payload);
  }

  return createReview(payload);
}
