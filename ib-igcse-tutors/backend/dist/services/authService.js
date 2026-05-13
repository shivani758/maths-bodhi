import { createUser, findAdminUserByIdentifier, findUserByEmail, findUserById, updateUser, } from "../repositories/postgres/userRepository.js";
import { ApiError } from "../utils/ApiError.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
function toSessionUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
}
export async function authenticateAdmin(identifier, password) {
    const normalizedIdentifier = identifier.trim().toLowerCase();
    const user = await findAdminUserByIdentifier(normalizedIdentifier);
    if (!user || !user.active) {
        throw new ApiError(401, "Invalid email or password.", { code: "INVALID_CREDENTIALS" });
    }
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
        throw new ApiError(401, "Invalid email or password.", { code: "INVALID_CREDENTIALS" });
    }
    await updateUser(user.id, { lastLoginAt: new Date() });
    return toSessionUser(user);
}
export async function getUserSessionById(userId) {
    const user = await findUserById(userId);
    if (!user || !user.active) {
        return null;
    }
    return toSessionUser(user);
}
export async function ensureSeedAdmin(input) {
    const normalizedEmail = input.email.trim().toLowerCase();
    const existing = await findUserByEmail(normalizedEmail);
    if (existing) {
        return existing;
    }
    const passwordHash = await hashPassword(input.password);
    return createUser({
        name: input.name,
        email: normalizedEmail,
        passwordHash,
        role: input.role ?? "super_admin",
        active: true,
    });
}
//# sourceMappingURL=authService.js.map