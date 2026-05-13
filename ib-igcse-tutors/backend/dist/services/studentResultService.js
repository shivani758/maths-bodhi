import { query } from "../db/postgres.js";
import { deleteContentRowById, findContentRowById, } from "../repositories/postgres/contentRepository.js";
import { ApiError } from "../utils/ApiError.js";
function toStudentResult(row) {
    const data = row.data ?? {};
    return {
        id: row.id,
        sourceId: row.source_id ?? String(data.sourceId ?? ""),
        studentLabel: row.student_label,
        board: row.board ?? "",
        classLevel: String(data.classLevel ?? ""),
        resultSummary: String(data.resultSummary ?? ""),
        story: String(data.story ?? ""),
        linkedTutorId: row.linked_tutor_id ?? "",
        linkedPage: String(data.linkedPage ?? ""),
        city: row.city ?? "gurugram",
        locality: String(data.locality ?? ""),
        featured: row.featured,
        status: row.status,
        beforeResult: String(data.beforeResult ?? ""),
        afterResult: String(data.afterResult ?? ""),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
function serializeResult(doc) {
    const classBoard = [doc.board, doc.classLevel].filter(Boolean).join(" | ");
    const resultSummary = doc.resultSummary || [doc.beforeResult, doc.afterResult].filter(Boolean).join(" to ");
    return {
        id: doc.id ?? "",
        sourceId: doc.sourceId ?? "",
        studentLabel: doc.studentLabel,
        board: doc.board ?? "",
        classLevel: doc.classLevel ?? "",
        classBoard,
        resultSummary,
        story: doc.story,
        linkedTutorId: doc.linkedTutorId || "",
        linkedPageId: doc.linkedPage ?? "",
        linkedPage: doc.linkedPage ?? "",
        linkedCitySlug: doc.city ?? "gurugram",
        linkedLocalitySlug: doc.locality ?? "",
        featured: Boolean(doc.featured),
        status: doc.status,
        beforeResult: doc.beforeResult ?? "",
        afterResult: doc.afterResult ?? "",
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}
function buildStudentResultPayload(payload, existing) {
    return {
        id: existing?.id,
        sourceId: payload.sourceId ?? existing?.sourceId ?? "",
        studentLabel: payload.studentLabel ?? existing?.studentLabel ?? "",
        board: payload.board ?? existing?.board ?? "",
        classLevel: payload.classLevel ?? existing?.classLevel ?? "",
        resultSummary: payload.resultSummary ?? existing?.resultSummary ?? "",
        story: payload.story ?? existing?.story ?? "",
        linkedTutorId: payload.linkedTutorId ?? existing?.linkedTutorId ?? "",
        linkedPage: payload.linkedPage ?? existing?.linkedPage ?? "",
        city: payload.city ?? existing?.city ?? "gurugram",
        locality: payload.locality ?? existing?.locality ?? "",
        featured: payload.featured ?? existing?.featured ?? false,
        status: payload.status ?? existing?.status ?? "draft",
        beforeResult: payload.beforeResult ?? existing?.beforeResult ?? "",
        afterResult: payload.afterResult ?? existing?.afterResult ?? "",
        createdAt: existing?.createdAt,
        updatedAt: existing?.updatedAt,
    };
}
async function insertStudentResult(payload) {
    const result = await query(`
      INSERT INTO student_results (
        source_id,
        student_label,
        status,
        featured,
        linked_tutor_id,
        board,
        city,
        data
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [
        payload.sourceId || null,
        payload.studentLabel,
        payload.status,
        payload.featured,
        payload.linkedTutorId,
        payload.board,
        payload.city,
        payload,
    ]);
    return result.rows[0];
}
async function updateStudentResultRow(id, payload) {
    const result = await query(`
      UPDATE student_results
      SET
        source_id = $1,
        student_label = $2,
        status = $3,
        featured = $4,
        linked_tutor_id = $5,
        board = $6,
        city = $7,
        data = $8
      WHERE id::text = $9
      RETURNING *
    `, [
        payload.sourceId || null,
        payload.studentLabel,
        payload.status,
        payload.featured,
        payload.linkedTutorId,
        payload.board,
        payload.city,
        payload,
        id,
    ]);
    return result.rows[0] ?? null;
}
export async function listStudentResults() {
    const result = await query("SELECT * FROM student_results ORDER BY updated_at DESC");
    return result.rows.map((row) => serializeResult(toStudentResult(row)));
}
export async function getStudentResultById(id) {
    const result = await findContentRowById("student_results", id);
    if (!result) {
        throw new ApiError(404, "Student result not found.", { code: "RESULT_NOT_FOUND" });
    }
    return serializeResult(toStudentResult(result));
}
export async function getApprovedStudentResults() {
    const result = await query("SELECT * FROM student_results WHERE status = 'approved' ORDER BY updated_at DESC");
    return result.rows.map((row) => serializeResult(toStudentResult(row)));
}
export async function createStudentResult(payload) {
    const result = await insertStudentResult(buildStudentResultPayload(payload));
    return serializeResult(toStudentResult(result));
}
export async function updateStudentResult(id, payload) {
    const result = await findContentRowById("student_results", id);
    if (!result) {
        throw new ApiError(404, "Student result not found.", { code: "RESULT_NOT_FOUND" });
    }
    const updated = await updateStudentResultRow(id, buildStudentResultPayload(payload, toStudentResult(result)));
    return serializeResult(toStudentResult(updated));
}
export async function deleteStudentResult(id) {
    const result = await deleteContentRowById("student_results", id);
    if (!result) {
        throw new ApiError(404, "Student result not found.", { code: "RESULT_NOT_FOUND" });
    }
    return serializeResult(toStudentResult(result));
}
export async function upsertStudentResultBySourceId(payload) {
    const existing = await query("SELECT * FROM student_results WHERE source_id = $1 LIMIT 1", [payload.sourceId]);
    if (existing.rows[0]) {
        return updateStudentResult(existing.rows[0].id, payload);
    }
    return createStudentResult(payload);
}
//# sourceMappingURL=studentResultService.js.map