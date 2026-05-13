import pg from "pg";
import { env } from "../config/env.js";

const { Pool } = pg;

let pool: pg.Pool | null = null;

function getErrorMessage(error: unknown, fallback = "Unknown PostgreSQL error.") {
  return error instanceof Error ? error.message : fallback;
}

function buildPoolConfig(): pg.PoolConfig {
  const baseConfig = {
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  } satisfies pg.PoolConfig;

  if (env.DATABASE_URL) {
    return {
      ...baseConfig,
      connectionString: env.DATABASE_URL,
    };
  }

  return {
    ...baseConfig,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  };
}

export function getPostgresPool() {
  if (!pool) {
    pool = new Pool(buildPoolConfig());

    pool.on("error", (error) => {
      console.error("Unexpected PostgreSQL pool error.", getErrorMessage(error));
    });
  }

  return pool;
}

export async function query<Row extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  values: unknown[] = [],
) {
  return getPostgresPool().query<Row>(text, values);
}

export async function connectPostgres() {
  try {
    await query("SELECT 1");
  } catch (error) {
    const message = getErrorMessage(error, "Unknown PostgreSQL connection error.");
    throw new Error(`Unable to connect to PostgreSQL: ${message}`);
  }
}

export async function closePostgresPool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
