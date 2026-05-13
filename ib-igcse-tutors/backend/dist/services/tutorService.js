import { query } from "../db/postgres.js";
import { deleteContentRowById, findContentRowById, } from "../repositories/postgres/contentRepository.js";
import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slug.js";
import { createFieldErrorDetails } from "../utils/validationDetails.js";
function unique(values = []) {
    return [...new Set(values.filter(Boolean))];
}
function getExperienceYears(experienceYears = 0, experienceLabel = "") {
    if (experienceYears > 0) {
        return experienceYears;
    }
    const match = experienceLabel.match(/\d+/);
    return match ? Number(match[0]) : 0;
}
function getExperienceLabel(experienceYears = 0, experienceLabel = "") {
    if (experienceLabel.trim()) {
        return experienceLabel.trim();
    }
    return experienceYears > 0 ? `${experienceYears} years` : "";
}
function toTutor(row) {
    const data = row.data ?? {};
    return {
        sourceId: row.source_id ?? String(data.sourceId ?? ""),
        name: row.name,
        slug: row.slug,
        title: row.title,
        shortBio: String(data.shortBio ?? ""),
        fullBio: String(data.fullBio ?? ""),
        teachingStyle: String(data.teachingStyle ?? ""),
        boards: Array.isArray(data.boards) ? data.boards.map(String) : [],
        classesSupported: Array.isArray(data.classesSupported) ? data.classesSupported.map(String) : [],
        topics: Array.isArray(data.topics) ? data.topics.map(String) : [],
        cities: Array.isArray(data.cities) ? data.cities.map(String) : [],
        localities: Array.isArray(data.localities) ? data.localities.map(String) : [],
        serviceModes: Array.isArray(data.serviceModes) ? data.serviceModes.map(String) : [],
        experienceYears: Number(data.experienceYears ?? 0),
        experienceLabel: String(data.experienceLabel ?? ""),
        rating: Number(data.rating ?? 0),
        startingFee: String(data.startingFee ?? ""),
        featured: row.featured,
        featuredInHome: row.featured_in_home,
        status: row.status,
        image: String(data.image ?? ""),
        imageAlt: String(data.imageAlt ?? ""),
        seo: data.seo && typeof data.seo === "object" ? data.seo : {},
        qualifications: Array.isArray(data.qualifications) ? data.qualifications.map(String) : [],
        achievements: Array.isArray(data.achievements) ? data.achievements.map(String) : [],
        badges: Array.isArray(data.badges) ? data.badges.map(String) : [],
        schoolFocus: Array.isArray(data.schoolFocus) ? data.schoolFocus.map(String) : [],
        availability: String(data.availability ?? ""),
        availabilityStatus: ["available", "limited", "waitlist"].includes(String(data.availabilityStatus))
            ? String(data.availabilityStatus)
            : "available",
        displayOrder: row.display_order,
        linkedReviewIds: Array.isArray(data.linkedReviewIds) ? data.linkedReviewIds.map(String) : [],
        linkedResultIds: Array.isArray(data.linkedResultIds) ? data.linkedResultIds.map(String) : [],
        featuredOn: Array.isArray(data.featuredOn) ? data.featuredOn.map(String) : [],
        id: row.id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
function serializeTutor(doc) {
    const experienceYears = getExperienceYears(doc.experienceYears, doc.experienceLabel);
    const experience = getExperienceLabel(experienceYears, doc.experienceLabel);
    return {
        id: doc.id ?? "",
        sourceId: doc.sourceId ?? "",
        name: doc.name,
        slug: doc.slug,
        title: doc.title,
        shortBio: doc.shortBio ?? "",
        fullBio: doc.fullBio ?? "",
        teachingStyle: doc.teachingStyle ?? "",
        boards: doc.boards ?? [],
        classesSupported: doc.classesSupported ?? [],
        topics: doc.topics ?? [],
        cities: doc.cities ?? [],
        localities: doc.localities ?? [],
        serviceModes: doc.serviceModes ?? [],
        experienceYears,
        experienceLabel: experience,
        experience,
        rating: doc.rating ?? 0,
        startingFee: doc.startingFee ?? "",
        featured: Boolean(doc.featured),
        featuredInHome: Boolean(doc.featuredInHome),
        status: doc.status,
        image: doc.image ?? "",
        imageAlt: doc.imageAlt ?? "",
        seo: doc.seo ?? {},
        qualifications: doc.qualifications ?? [],
        achievements: doc.achievements ?? [],
        badges: doc.badges ?? [],
        schoolFocus: doc.schoolFocus ?? [],
        availability: doc.availability ?? "",
        availabilityStatus: doc.availabilityStatus ?? "available",
        displayOrder: doc.displayOrder ?? 99,
        linkedReviewIds: doc.linkedReviewIds ?? [],
        linkedResultIds: doc.linkedResultIds ?? [],
        featuredOn: doc.featuredOn ?? [],
        summary: doc.shortBio ?? "",
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}
function buildTutorPayload(payload, existing) {
    const experienceYears = getExperienceYears(payload.experienceYears ?? existing?.experienceYears ?? 0, payload.experienceLabel ?? existing?.experienceLabel ?? "");
    return {
        sourceId: payload.sourceId ?? existing?.sourceId ?? "",
        name: payload.name ?? existing?.name ?? "",
        slug: slugify(payload.slug || existing?.slug || payload.name || existing?.name || ""),
        title: payload.title ?? existing?.title ?? "",
        shortBio: payload.shortBio ?? existing?.shortBio ?? "",
        fullBio: payload.fullBio ?? existing?.fullBio ?? "",
        teachingStyle: payload.teachingStyle ?? existing?.teachingStyle ?? "",
        boards: payload.boards ? unique(payload.boards) : existing?.boards ?? [],
        classesSupported: payload.classesSupported
            ? unique(payload.classesSupported)
            : existing?.classesSupported ?? [],
        topics: payload.topics ? unique(payload.topics) : existing?.topics ?? [],
        cities: payload.cities ? unique(payload.cities) : existing?.cities ?? [],
        localities: payload.localities ? unique(payload.localities) : existing?.localities ?? [],
        serviceModes: payload.serviceModes ? unique(payload.serviceModes) : existing?.serviceModes ?? [],
        experienceYears,
        experienceLabel: getExperienceLabel(experienceYears, payload.experienceLabel ?? existing?.experienceLabel ?? ""),
        rating: payload.rating ?? existing?.rating ?? 0,
        startingFee: payload.startingFee ?? existing?.startingFee ?? "",
        featured: payload.featured ?? existing?.featured ?? false,
        featuredInHome: payload.featuredInHome ?? existing?.featuredInHome ?? false,
        status: payload.status ?? existing?.status ?? "active",
        image: payload.image ?? existing?.image ?? "",
        imageAlt: payload.imageAlt ?? existing?.imageAlt ?? "",
        seo: payload.seo ?? existing?.seo ?? {},
        qualifications: payload.qualifications ? unique(payload.qualifications) : existing?.qualifications ?? [],
        achievements: payload.achievements ? unique(payload.achievements) : existing?.achievements ?? [],
        badges: payload.badges ? unique(payload.badges) : existing?.badges ?? [],
        schoolFocus: payload.schoolFocus ? unique(payload.schoolFocus) : existing?.schoolFocus ?? [],
        availability: payload.availability ?? existing?.availability ?? "",
        availabilityStatus: payload.availabilityStatus ?? existing?.availabilityStatus ?? "available",
        displayOrder: payload.displayOrder ?? existing?.displayOrder ?? 99,
        linkedReviewIds: payload.linkedReviewIds
            ? unique(payload.linkedReviewIds)
            : existing?.linkedReviewIds ?? [],
        linkedResultIds: payload.linkedResultIds
            ? unique(payload.linkedResultIds)
            : existing?.linkedResultIds ?? [],
        featuredOn: payload.featuredOn ? unique(payload.featuredOn) : existing?.featuredOn ?? [],
        id: existing?.id,
        createdAt: existing?.createdAt,
        updatedAt: existing?.updatedAt,
    };
}
async function ensureUniqueSlug(slug, excludeId) {
    const existing = await query(`
      SELECT id
      FROM tutors
      WHERE LOWER(slug) = LOWER($1)
        AND ($2::text IS NULL OR id::text <> $2)
      LIMIT 1
    `, [slug, excludeId ?? null]);
    if (existing.rows[0]) {
        throw new ApiError(409, "A tutor with this slug already exists.", {
            code: "DUPLICATE_TUTOR_SLUG",
            details: createFieldErrorDetails("slug", "A tutor with this slug already exists."),
        });
    }
}
async function insertTutor(payload) {
    const result = await query(`
      INSERT INTO tutors (
        source_id,
        name,
        slug,
        title,
        status,
        featured,
        featured_in_home,
        display_order,
        data
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [
        payload.sourceId || null,
        payload.name,
        payload.slug,
        payload.title,
        payload.status,
        payload.featured,
        payload.featuredInHome,
        payload.displayOrder,
        payload,
    ]);
    return result.rows[0];
}
async function updateTutorRow(id, payload) {
    const result = await query(`
      UPDATE tutors
      SET
        source_id = $1,
        name = $2,
        slug = $3,
        title = $4,
        status = $5,
        featured = $6,
        featured_in_home = $7,
        display_order = $8,
        data = $9
      WHERE id::text = $10
      RETURNING *
    `, [
        payload.sourceId || null,
        payload.name,
        payload.slug,
        payload.title,
        payload.status,
        payload.featured,
        payload.featuredInHome,
        payload.displayOrder,
        payload,
        id,
    ]);
    return result.rows[0] ?? null;
}
export async function listTutors() {
    const result = await query("SELECT * FROM tutors ORDER BY display_order ASC, name ASC");
    return result.rows.map((row) => serializeTutor(toTutor(row)));
}
export async function getTutorById(id) {
    const tutor = await findContentRowById("tutors", id);
    if (!tutor) {
        throw new ApiError(404, "Tutor not found.", { code: "TUTOR_NOT_FOUND" });
    }
    return serializeTutor(toTutor(tutor));
}
export async function getPublicTutors() {
    const result = await query("SELECT * FROM tutors WHERE status = 'active' ORDER BY display_order ASC, name ASC");
    return result.rows.map((row) => serializeTutor(toTutor(row)));
}
export async function createTutor(payload) {
    const nextPayload = buildTutorPayload(payload);
    await ensureUniqueSlug(nextPayload.slug);
    const tutor = await insertTutor(nextPayload);
    return serializeTutor(toTutor(tutor));
}
export async function updateTutor(id, payload) {
    const tutor = await findContentRowById("tutors", id);
    if (!tutor) {
        throw new ApiError(404, "Tutor not found.", { code: "TUTOR_NOT_FOUND" });
    }
    const nextPayload = buildTutorPayload(payload, toTutor(tutor));
    await ensureUniqueSlug(nextPayload.slug, id);
    const updated = await updateTutorRow(id, nextPayload);
    return serializeTutor(toTutor(updated));
}
export async function deleteTutor(id) {
    const tutor = await deleteContentRowById("tutors", id);
    if (!tutor) {
        throw new ApiError(404, "Tutor not found.", { code: "TUTOR_NOT_FOUND" });
    }
    return serializeTutor(toTutor(tutor));
}
export async function upsertTutorBySourceId(payload) {
    const existing = await query("SELECT * FROM tutors WHERE source_id = $1 LIMIT 1", [
        payload.sourceId,
    ]);
    if (existing.rows[0]) {
        return updateTutor(existing.rows[0].id, payload);
    }
    return createTutor(payload);
}
//# sourceMappingURL=tutorService.js.map