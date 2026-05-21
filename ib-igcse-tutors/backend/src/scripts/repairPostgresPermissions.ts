import { env } from "../config/env.js";
import { closePostgresPool, getPostgresErrorMessage, query } from "../db/postgres.js";

function quoteIdentifier(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function getDatabaseRole() {
  if (env.DB_USER) {
    return env.DB_USER;
  }

  if (!env.DATABASE_URL) {
    throw new Error("DB_USER or DATABASE_URL is required to repair PostgreSQL permissions.");
  }

  const username = new URL(env.DATABASE_URL).username;

  if (!username) {
    throw new Error("DATABASE_URL does not include a database username.");
  }

  return decodeURIComponent(username);
}

async function repairPostgresPermissions() {
  const roleName = getDatabaseRole();
  const role = quoteIdentifier(roleName);
  const readOnlyRoleNames = process.argv.slice(2).filter(Boolean);

  await query(`GRANT USAGE ON SCHEMA public TO ${role}`);
  await query(`GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ${role}`);
  await query(`GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO ${role}`);
  await query(`
    ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ${role}
  `);
  await query(`
    ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO ${role}
  `);

  for (const readOnlyRoleName of readOnlyRoleNames) {
    const readOnlyRole = quoteIdentifier(readOnlyRoleName);

    await query(`GRANT USAGE ON SCHEMA public TO ${readOnlyRole}`);
    await query(`GRANT SELECT ON ALL TABLES IN SCHEMA public TO ${readOnlyRole}`);
    await query(`GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ${readOnlyRole}`);
    await query(`
      ALTER DEFAULT PRIVILEGES IN SCHEMA public
      GRANT SELECT ON TABLES TO ${readOnlyRole}
    `);
    await query(`
      ALTER DEFAULT PRIVILEGES IN SCHEMA public
      GRANT USAGE, SELECT ON SEQUENCES TO ${readOnlyRole}
    `);
  }

  const check = await query<{ can_select_reviews: boolean }>(
    "SELECT has_table_privilege(current_user, 'public.reviews', 'SELECT') AS can_select_reviews",
  );
  const readOnlyRoleChecks = await Promise.all(
    readOnlyRoleNames.map(async (readOnlyRoleName) => {
      const result = await query<{ can_select_reviews: boolean }>(
        "SELECT has_table_privilege($1, 'public.reviews', 'SELECT') AS can_select_reviews",
        [readOnlyRoleName],
      );

      return `${readOnlyRoleName}: ${result.rows[0]?.can_select_reviews ? "yes" : "no"}`;
    }),
  );

  console.log(
    `PostgreSQL permissions repaired for role ${roleName}. public.reviews SELECT: ${
      check.rows[0]?.can_select_reviews ? "yes" : "no"
    }.${readOnlyRoleChecks.length ? ` Extra read-only roles: ${readOnlyRoleChecks.join(", ")}.` : ""}`,
  );
}

repairPostgresPermissions()
  .catch((error) => {
    console.error("PostgreSQL permissions repair failed.", getPostgresErrorMessage(error));
    process.exitCode = 1;
  })
  .finally(async () => {
    await closePostgresPool();
  });
