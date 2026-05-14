import { query } from "../../db/postgres.js";

export type ContentTable =
  | "tutors"
  | "blog_posts"
  | "reviews"
  | "student_results"
  | "pages";

export type ContentRow = {
  id: string;
  source_id: string | null;
  data: Record<string, unknown> | null;
  created_at: Date;
  updated_at: Date;
};

export async function findContentRowById<Row extends ContentRow>(table: ContentTable, id: string) {
  const result = await query<Row>(`SELECT * FROM ${table} WHERE id::text = $1 LIMIT 1`, [id]);
  return result.rows[0] ?? null;
}

export async function deleteContentRowById<Row extends ContentRow>(table: ContentTable, id: string) {
  const result = await query<Row>(`DELETE FROM ${table} WHERE id::text = $1 RETURNING *`, [id]);
  return result.rows[0] ?? null;
}
