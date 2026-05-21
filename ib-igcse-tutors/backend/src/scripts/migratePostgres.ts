import { closePostgresPool, getPostgresErrorMessage } from "../db/postgres.js";
import { applyPostgresSchema } from "../db/migrate.js";

async function migratePostgres() {
  await applyPostgresSchema();
  console.log("PostgreSQL schema migration completed successfully.");
}

migratePostgres()
  .catch((error) => {
    console.error("PostgreSQL schema migration failed.", getPostgresErrorMessage(error));
    process.exitCode = 1;
  })
  .finally(async () => {
    await closePostgresPool();
  });
