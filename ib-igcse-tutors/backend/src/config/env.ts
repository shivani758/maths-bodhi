import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const optionalTrimmedString = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().optional(),
);

function decodeUrlPassword(value: string) {
  try {
    const password = new URL(value).password;
    return password ? decodeURIComponent(password) : "";
  } catch {
    return undefined;
  }
}

function validatePostgresUrl(value: string) {
  try {
    const url = new URL(value);

    if (!["postgres:", "postgresql:"].includes(url.protocol)) {
      return "DATABASE_URL must use the postgres:// or postgresql:// protocol.";
    }

    if (!url.hostname || !url.username || !url.password || !url.pathname || url.pathname === "/") {
      return "DATABASE_URL must include user, password, host, and database name.";
    }

    return null;
  } catch {
    return "DATABASE_URL must be a valid PostgreSQL connection URL.";
  }
}

const rawEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  HOST: z.string().min(1).default(process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost"),
  PORT: z.coerce.number().default(4000),
  DB_PROVIDER: z.enum(["postgres"]).default("postgres"),
  DATABASE_URL: optionalTrimmedString,
  DB_HOST: optionalTrimmedString.default("localhost"),
  DB_PORT: z.coerce.number().int().positive().default(5432),
  DB_NAME: optionalTrimmedString,
  DB_USER: optionalTrimmedString,
  DB_PASSWORD: z.preprocess(
    (value) => (typeof value === "string" && value.length === 0 ? undefined : value),
    z.string().optional(),
  ),
  SESSION_SECRET: z.string().min(16, "SESSION_SECRET must be at least 16 characters."),
  SESSION_COOKIE_NAME: z.string().min(1).default("maths_bodhi_admin_sid"),
  SESSION_COOKIE_SAME_SITE: z.enum(["lax", "strict", "none"]).optional(),
  SESSION_COOKIE_SECURE: z.coerce.boolean().optional(),
  SESSION_COOKIE_DOMAIN: z.string().trim().optional(),
  JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters."),
  FRONTEND_ORIGIN: z.string().min(1).default("http://localhost:5173"),
  ADMIN_SEED_NAME: z.string().min(1).default("Maths Bodhi Super Admin"),
  ADMIN_SEED_EMAIL: z.string().email(),
  ADMIN_SEED_PASSWORD: z.string().min(8, "ADMIN_SEED_PASSWORD must be at least 8 characters."),
}).superRefine((value, context) => {
  const databaseUrlPassword = value.DATABASE_URL ? decodeUrlPassword(value.DATABASE_URL) : undefined;

  if (value.DATABASE_URL) {
    const databaseUrlIssue = validatePostgresUrl(value.DATABASE_URL);

    if (databaseUrlIssue) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["DATABASE_URL"],
        message: databaseUrlIssue,
      });
    }

    if (value.DB_PASSWORD && databaseUrlPassword !== undefined && value.DB_PASSWORD !== databaseUrlPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["DB_PASSWORD"],
        message: "DB_PASSWORD must match the password encoded in DATABASE_URL when both are set.",
      });
    }
  }

  const effectiveDatabasePassword = value.DB_PASSWORD ?? databaseUrlPassword;

  if (effectiveDatabasePassword && effectiveDatabasePassword === value.SESSION_SECRET) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["SESSION_SECRET"],
      message: "SESSION_SECRET must be a separate value from the PostgreSQL password.",
    });
  }

  if (value.DATABASE_URL) {
    return;
  }

  const requiredDatabaseFields: Array<[string, unknown]> = [
    ["DB_NAME", value.DB_NAME],
    ["DB_USER", value.DB_USER],
    ["DB_PASSWORD", value.DB_PASSWORD],
  ];
  const missingFields = requiredDatabaseFields.filter(([, fieldValue]) => !fieldValue);

  for (const [fieldName] of missingFields) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: [fieldName],
      message: `${fieldName} is required when DATABASE_URL is not set.`,
    });
  }
});

const rawEnv = rawEnvSchema.parse(process.env);

function parseFrontendOrigins(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const env = {
  ...rawEnv,
  FRONTEND_ORIGINS: parseFrontendOrigins(rawEnv.FRONTEND_ORIGIN),
  SESSION_COOKIE_SAME_SITE:
    rawEnv.SESSION_COOKIE_SAME_SITE ?? (rawEnv.NODE_ENV === "production" ? "none" : "lax"),
  SESSION_COOKIE_SECURE:
    rawEnv.SESSION_COOKIE_SECURE ?? (rawEnv.NODE_ENV === "production"),
  SESSION_COOKIE_DOMAIN: rawEnv.SESSION_COOKIE_DOMAIN || undefined,
};

export const isProduction = env.NODE_ENV === "production";
