import type { UserRole } from "../../types/auth.js";
import { query } from "../../db/postgres.js";

type UserRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  active: boolean;
  email_verified_at: Date | null;
  email_verification_token_hash: string;
  email_verification_expires_at: Date | null;
  email_verification_sent_at: Date | null;
  portal_profile: Record<string, unknown> | null;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  active: boolean;
  emailVerifiedAt: Date | null;
  emailVerificationTokenHash: string;
  emailVerificationExpiresAt: Date | null;
  emailVerificationSentAt: Date | null;
  portalProfile: Record<string, unknown>;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type CreateUserInput = {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  active?: boolean;
  emailVerifiedAt?: Date | null;
  emailVerificationTokenHash?: string;
  emailVerificationExpiresAt?: Date | null;
  emailVerificationSentAt?: Date | null;
  portalProfile?: Record<string, unknown>;
  lastLoginAt?: Date | null;
};

type UpdateUserPatch = Partial<CreateUserInput>;

function mapUserRow(row: UserRow): UserRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role as UserRole,
    active: row.active,
    emailVerifiedAt: row.email_verified_at,
    emailVerificationTokenHash: row.email_verification_token_hash,
    emailVerificationExpiresAt: row.email_verification_expires_at,
    emailVerificationSentAt: row.email_verification_sent_at,
    portalProfile: row.portal_profile ?? {},
    lastLoginAt: row.last_login_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapFirstUser(rows: UserRow[]) {
  const row = rows[0];
  return row ? mapUserRow(row) : null;
}

export async function findUserById(id: string) {
  const result = await query<UserRow>("SELECT * FROM users WHERE id::text = $1 LIMIT 1", [id]);
  return mapFirstUser(result.rows);
}

export async function findUserByEmail(email: string) {
  const result = await query<UserRow>("SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1", [
    email,
  ]);
  return mapFirstUser(result.rows);
}

export async function findAdminUserByIdentifier(identifier: string) {
  const result = await query<UserRow>(
    `
      SELECT *
      FROM users
      WHERE (LOWER(email) = LOWER($1) OR LOWER(name) = LOWER($1))
        AND role = ANY($2::text[])
      LIMIT 1
    `,
    [identifier, ["super_admin", "admin", "editor"]],
  );
  return mapFirstUser(result.rows);
}

export async function findUserByEmailAndRole(email: string, role: UserRole) {
  const result = await query<UserRow>(
    "SELECT * FROM users WHERE LOWER(email) = LOWER($1) AND role = $2 LIMIT 1",
    [email, role],
  );
  return mapFirstUser(result.rows);
}

export async function findPortalUserByVerificationToken(tokenHash: string) {
  const result = await query<UserRow>(
    `
      SELECT *
      FROM users
      WHERE email_verification_token_hash = $1
        AND email_verification_expires_at > NOW()
        AND role = ANY($2::text[])
      LIMIT 1
    `,
    [tokenHash, ["student", "tutor"]],
  );
  return mapFirstUser(result.rows);
}

export async function createUser(input: CreateUserInput) {
  const result = await query<UserRow>(
    `
      INSERT INTO users (
        name,
        email,
        password_hash,
        role,
        active,
        email_verified_at,
        email_verification_token_hash,
        email_verification_expires_at,
        email_verification_sent_at,
        portal_profile,
        last_login_at
      )
      VALUES ($1, LOWER($2), $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `,
    [
      input.name,
      input.email,
      input.passwordHash,
      input.role,
      input.active ?? true,
      input.emailVerifiedAt ?? null,
      input.emailVerificationTokenHash ?? "",
      input.emailVerificationExpiresAt ?? null,
      input.emailVerificationSentAt ?? null,
      input.portalProfile ?? {},
      input.lastLoginAt ?? null,
    ],
  );

  return mapUserRow(result.rows[0]);
}

export async function updateUser(id: string, patch: UpdateUserPatch) {
  const assignments: string[] = [];
  const values: unknown[] = [];

  function add(column: string, value: unknown) {
    values.push(value);
    assignments.push(`${column} = $${values.length}`);
  }

  if (patch.name !== undefined) add("name", patch.name);
  if (patch.email !== undefined) add("email", patch.email.toLowerCase());
  if (patch.passwordHash !== undefined) add("password_hash", patch.passwordHash);
  if (patch.role !== undefined) add("role", patch.role);
  if (patch.active !== undefined) add("active", patch.active);
  if (patch.emailVerifiedAt !== undefined) add("email_verified_at", patch.emailVerifiedAt);
  if (patch.emailVerificationTokenHash !== undefined) {
    add("email_verification_token_hash", patch.emailVerificationTokenHash);
  }
  if (patch.emailVerificationExpiresAt !== undefined) {
    add("email_verification_expires_at", patch.emailVerificationExpiresAt);
  }
  if (patch.emailVerificationSentAt !== undefined) {
    add("email_verification_sent_at", patch.emailVerificationSentAt);
  }
  if (patch.portalProfile !== undefined) add("portal_profile", patch.portalProfile);
  if (patch.lastLoginAt !== undefined) add("last_login_at", patch.lastLoginAt);

  if (!assignments.length) {
    return findUserById(id);
  }

  values.push(id);
  const result = await query<UserRow>(
    `UPDATE users SET ${assignments.join(", ")} WHERE id::text = $${values.length} RETURNING *`,
    values,
  );

  return mapFirstUser(result.rows);
}
