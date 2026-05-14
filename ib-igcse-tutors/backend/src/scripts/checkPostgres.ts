import { closePostgresPool, getPostgresErrorMessage, query } from "../db/postgres.js";

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

type DatabaseCheckRow = {
  database_name: string;
  schema_name: string;
};

type TableCheckRow = {
  table_name: string;
};

async function checkPostgres() {
  const databaseResult = await query<DatabaseCheckRow>(
    "SELECT current_database() AS database_name, current_schema() AS schema_name",
  );
  const database = databaseResult.rows[0];

  const tableResult = await query<TableCheckRow>(
    `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
        AND table_name = ANY($1::text[])
      ORDER BY table_name
    `,
    [REQUIRED_PUBLIC_TABLES],
  );

  const foundTables = new Set(tableResult.rows.map((row) => row.table_name));
  const missingTables = REQUIRED_PUBLIC_TABLES.filter((tableName) => !foundTables.has(tableName));

  console.log(
    `PostgreSQL connection OK. Database: ${database.database_name}. Schema: ${database.schema_name}.`,
  );

  if (missingTables.length) {
    throw new Error(
      `Missing required public tables: ${missingTables.join(", ")}. Run src/db/schema.sql first.`,
    );
  }

  console.log(`Found ${REQUIRED_PUBLIC_TABLES.length} required public tables.`);
}

checkPostgres()
  .catch((error) => {
    console.error("PostgreSQL check failed.", getPostgresErrorMessage(error));
    process.exitCode = 1;
  })
  .finally(async () => {
    await closePostgresPool();
  });
