import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { PoolClient } from "pg";
import { closePostgresPool, getPostgresErrorMessage, getPostgresPool } from "../db/postgres.js";

const currentDir = dirname(fileURLToPath(import.meta.url));
const schemaPath = resolve(currentDir, "../db/schema.sql");
const REQUIRED_PUBLIC_TABLES = [
  "users",
  "admin_sessions",
  "tutors",
  "blog_posts",
  "reviews",
  "student_results",
  "pages",
  "faqs",
  "cities",
  "localities",
  "media_assets",
  "settings",
] as const;

type SchemaPrivilegeRow = {
  current_user: string;
  can_create_public: boolean;
  missing_table_count: string;
};

async function assertCanCreateMissingTables(client: PoolClient) {
  const result = await client.query<SchemaPrivilegeRow>(
    `
      SELECT
        current_user,
        has_schema_privilege(current_user, 'public', 'CREATE') AS can_create_public,
        (
          SELECT COUNT(*)::text
          FROM unnest($1::text[]) AS required(table_name)
          WHERE NOT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'public'
              AND table_type = 'BASE TABLE'
              AND table_name = required.table_name
          )
        ) AS missing_table_count
    `,
    [REQUIRED_PUBLIC_TABLES],
  );

  const row = result.rows[0];
  const missingTableCount = Number(row?.missing_table_count ?? 0);

  if (missingTableCount > 0 && row && !row.can_create_public) {
    throw new Error(
      [
        `Database user "${row.current_user}" is missing CREATE privilege on schema "public".`,
        "Ask a PostgreSQL owner/admin to run:",
        `GRANT USAGE, CREATE ON SCHEMA public TO ${row.current_user};`,
      ].join(" "),
    );
  }
}

async function initPostgresSchema() {
  const schemaSql = await readFile(schemaPath, "utf8");
  const pool = getPostgresPool();
  const client = await pool.connect();

  try {
    await assertCanCreateMissingTables(client);
    await client.query(schemaSql);
    console.log(`PostgreSQL schema initialized from ${schemaPath}.`);
  } finally {
    client.release();
  }
}

initPostgresSchema()
  .catch((error) => {
    console.error("Failed to initialize PostgreSQL schema.", getPostgresErrorMessage(error));
    process.exitCode = 1;
  })
  .finally(async () => {
    await closePostgresPool();
  });
