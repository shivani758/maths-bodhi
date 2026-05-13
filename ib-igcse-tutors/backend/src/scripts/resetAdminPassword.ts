import { connectDatabase, disconnectDatabase } from "../config/db.js";
import { env } from "../config/env.js";
import { findUserByEmail, updateUser } from "../repositories/postgres/userRepository.js";
import { hashPassword } from "../utils/password.js";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown password reset error.";
}

async function resetAdminPassword() {
  await connectDatabase();

  const normalizedEmail = env.ADMIN_SEED_EMAIL.trim().toLowerCase();
  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    throw new Error("Seeded admin user not found.");
  }

  await updateUser(user.id, {
    passwordHash: await hashPassword(env.ADMIN_SEED_PASSWORD),
  });

  console.log("Admin password reset completed from ADMIN_SEED_PASSWORD.");
}

resetAdminPassword()
  .catch((error) => {
    console.error("Failed to reset the admin password.", getErrorMessage(error));
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
