import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const optionalTrimmedString = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().optional(),
);

const DEFAULT_FRONTEND_ORIGIN = "http://localhost:5173";
const PRODUCTION_DEFAULT_SAME_SITE = "lax";

function splitFrontendOrigins(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeFrontendOrigin(value: string) {
  if (value === "*") {
    return value;
  }

  try {
    const origin = value.replace(/\/+$/, "");
    const url = new URL(origin);

    if (!["http:", "https:"].includes(url.protocol) || url.origin !== origin) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

function parseFrontendOrigins(value: string) {
  const origins = splitFrontendOrigins(value)
    .map(normalizeFrontendOrigin)
    .filter((origin): origin is string => Boolean(origin));

  return [...new Set(origins)];
}

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
  FRONTEND_ORIGIN: optionalTrimmedString,
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

  const effectiveSameSite =
    value.SESSION_COOKIE_SAME_SITE ??
    (value.NODE_ENV === "production" ? PRODUCTION_DEFAULT_SAME_SITE : "lax");
  const effectiveSecure =
    value.SESSION_COOKIE_SECURE ?? (value.NODE_ENV === "production");
  const frontendOrigins = splitFrontendOrigins(value.FRONTEND_ORIGIN);
  const invalidFrontendOrigins = frontendOrigins.filter((origin) => !normalizeFrontendOrigin(origin));

  if (invalidFrontendOrigins.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["FRONTEND_ORIGIN"],
      message: `FRONTEND_ORIGIN contains invalid origin value(s): ${invalidFrontendOrigins.join(", ")}.`,
    });
  }

  if (value.NODE_ENV === "production" && !frontendOrigins.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["FRONTEND_ORIGIN"],
      message: "FRONTEND_ORIGIN is required in production so CORS is explicitly allowlisted.",
    });
  }

  if (value.NODE_ENV === "production" && frontendOrigins.includes("*")) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["FRONTEND_ORIGIN"],
      message: "FRONTEND_ORIGIN cannot include * in production.",
    });
  }

  if (value.NODE_ENV === "production" && !effectiveSecure) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["SESSION_COOKIE_SECURE"],
      message: "SESSION_COOKIE_SECURE must be true in production.",
    });
  }

  if (effectiveSameSite === "none" && !effectiveSecure) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["SESSION_COOKIE_SECURE"],
      message: "SESSION_COOKIE_SECURE must be true when SESSION_COOKIE_SAME_SITE is none.",
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
const frontendOrigin = rawEnv.FRONTEND_ORIGIN ?? DEFAULT_FRONTEND_ORIGIN;

export const env = {
  ...rawEnv,
  FRONTEND_ORIGIN: frontendOrigin,
  FRONTEND_ORIGINS: parseFrontendOrigins(frontendOrigin),
  SESSION_COOKIE_SAME_SITE:
    rawEnv.SESSION_COOKIE_SAME_SITE ??
    (rawEnv.NODE_ENV === "production" ? PRODUCTION_DEFAULT_SAME_SITE : "lax"),
  SESSION_COOKIE_SECURE:
    rawEnv.SESSION_COOKIE_SECURE ?? (rawEnv.NODE_ENV === "production"),
  SESSION_COOKIE_DOMAIN: rawEnv.SESSION_COOKIE_DOMAIN || undefined,
};

export const isProduction = env.NODE_ENV === "production";
