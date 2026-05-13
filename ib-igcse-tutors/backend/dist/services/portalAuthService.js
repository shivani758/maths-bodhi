import crypto from "node:crypto";
import { createUser, findPortalUserByVerificationToken, findUserByEmail, findUserByEmailAndRole, findUserById, updateUser, } from "../repositories/postgres/userRepository.js";
import { isProduction } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { createFieldErrorDetails } from "../utils/validationDetails.js";
const EMAIL_VERIFICATION_TTL_MS = 1000 * 60 * 60 * 48;
function normalizeEmail(value) {
    return value.trim().toLowerCase();
}
function normalizeText(value, fallback = "") {
    return typeof value === "string" ? value.trim() : fallback;
}
function normalizeStringList(values, fallback = []) {
    if (!Array.isArray(values)) {
        return fallback;
    }
    return [...new Set(values.map((item) => normalizeText(item)).filter(Boolean))];
}
function normalizeExperienceYears(value) {
    if (value === null || value === undefined || value === "") {
        return null;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}
function createDefaultPortalProfile() {
    return {
        phone: "",
        guardianName: "",
        city: "gurugram",
        board: "",
        classLevel: "",
        topicPreferences: [],
        localityPreferences: [],
        preferredMode: "Home Tuition",
        timingPreference: "",
        goal: "",
        requirementSummary: "",
        enquiryStatus: "new",
        demoStatus: "not_requested",
        savedTutorIds: [],
        boardSpecializations: [],
        classSegments: [],
        topicSpecializations: [],
        serviceAreas: [],
        serviceModes: [],
        availabilitySummary: "",
        profileSummary: "",
        experienceYears: null,
        qualificationHighlights: [],
        linkedTutorId: "",
    };
}
function sanitizePortalProfile(value) {
    const profile = {
        ...createDefaultPortalProfile(),
        ...(value && typeof value === "object" ? value : {}),
    };
    return {
        phone: normalizeText(profile.phone),
        guardianName: normalizeText(profile.guardianName),
        city: normalizeText(profile.city, "gurugram"),
        board: normalizeText(profile.board),
        classLevel: normalizeText(profile.classLevel),
        topicPreferences: normalizeStringList(profile.topicPreferences),
        localityPreferences: normalizeStringList(profile.localityPreferences),
        preferredMode: normalizeText(profile.preferredMode, "Home Tuition"),
        timingPreference: normalizeText(profile.timingPreference),
        goal: normalizeText(profile.goal),
        requirementSummary: normalizeText(profile.requirementSummary),
        enquiryStatus: normalizeText(profile.enquiryStatus, "new"),
        demoStatus: normalizeText(profile.demoStatus, "not_requested"),
        savedTutorIds: normalizeStringList(profile.savedTutorIds),
        boardSpecializations: normalizeStringList(profile.boardSpecializations),
        classSegments: normalizeStringList(profile.classSegments),
        topicSpecializations: normalizeStringList(profile.topicSpecializations),
        serviceAreas: normalizeStringList(profile.serviceAreas),
        serviceModes: normalizeStringList(profile.serviceModes),
        availabilitySummary: normalizeText(profile.availabilitySummary),
        profileSummary: normalizeText(profile.profileSummary),
        experienceYears: normalizeExperienceYears(profile.experienceYears),
        qualificationHighlights: normalizeStringList(profile.qualificationHighlights),
        linkedTutorId: normalizeText(profile.linkedTutorId),
    };
}
function buildStudentProfile(patch, existing) {
    const current = sanitizePortalProfile(existing);
    return sanitizePortalProfile({
        ...current,
        phone: patch.phone ?? current.phone,
        guardianName: patch.guardianName ?? current.guardianName,
        city: patch.city ?? current.city,
        board: patch.board ?? current.board,
        classLevel: patch.classLevel ?? current.classLevel,
        topicPreferences: patch.topicPreferences ?? current.topicPreferences,
        localityPreferences: patch.localityPreferences ?? current.localityPreferences,
        preferredMode: patch.preferredMode ?? current.preferredMode,
        timingPreference: patch.timingPreference ?? current.timingPreference,
        goal: patch.goal ?? current.goal,
        requirementSummary: patch.requirementSummary ?? current.requirementSummary,
        enquiryStatus: patch.enquiryStatus ?? current.enquiryStatus,
        demoStatus: patch.demoStatus ?? current.demoStatus,
        savedTutorIds: patch.savedTutorIds ?? current.savedTutorIds,
    });
}
function buildTutorProfile(patch, existing) {
    const current = sanitizePortalProfile(existing);
    return sanitizePortalProfile({
        ...current,
        phone: patch.phone ?? current.phone,
        city: patch.city ?? current.city,
        boardSpecializations: patch.boardSpecializations ?? current.boardSpecializations,
        classSegments: patch.classSegments ?? current.classSegments,
        topicSpecializations: patch.topicSpecializations ?? current.topicSpecializations,
        serviceAreas: patch.serviceAreas ?? current.serviceAreas,
        serviceModes: patch.serviceModes ?? current.serviceModes,
        availabilitySummary: patch.availabilitySummary ?? current.availabilitySummary,
        profileSummary: patch.profileSummary ?? current.profileSummary,
        experienceYears: patch.experienceYears === undefined ? current.experienceYears : patch.experienceYears,
        qualificationHighlights: patch.qualificationHighlights ?? current.qualificationHighlights,
        linkedTutorId: patch.linkedTutorId ?? current.linkedTutorId,
    });
}
function isPortalRole(role) {
    return role === "student" || role === "tutor";
}
function toPortalSessionUser(user) {
    return {
        id: user.id,
        role: user.role,
    };
}
function serializePortalUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        active: Boolean(user.active),
        emailVerified: Boolean(user.emailVerifiedAt),
        emailVerifiedAt: user.emailVerifiedAt ? user.emailVerifiedAt.toISOString() : null,
        verificationPending: !user.emailVerifiedAt,
        profile: sanitizePortalProfile(user.portalProfile),
    };
}
function createVerificationToken() {
    const token = crypto.randomBytes(24).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    return {
        token,
        tokenHash,
        expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TTL_MS),
    };
}
function buildVerificationPreviewUrl(token) {
    if (isProduction) {
        return null;
    }
    return `http://localhost:5173/verify-email?token=${token}`;
}
function logVerificationPreview(email, previewUrl) {
    if (!previewUrl) {
        return;
    }
    console.log(`[Maths Bodhi] Email verification for ${email}: ${previewUrl}`);
}
async function findPortalUserById(userId) {
    const user = await findUserById(userId);
    if (!user || !isPortalRole(user.role)) {
        return null;
    }
    return user;
}
export async function registerPortalAccount(payload) {
    const normalizedEmail = normalizeEmail(payload.email);
    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
        throw new ApiError(409, "An account with this email already exists.", {
            code: "EMAIL_ALREADY_IN_USE",
            details: createFieldErrorDetails("email", "An account with this email already exists."),
        });
    }
    const passwordHash = await hashPassword(payload.password);
    const verification = createVerificationToken();
    const portalProfile = payload.role === "student"
        ? buildStudentProfile(payload.profile)
        : buildTutorProfile(payload.profile);
    const user = (await createUser({
        name: payload.name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: payload.role,
        active: true,
        emailVerifiedAt: null,
        emailVerificationTokenHash: verification.tokenHash,
        emailVerificationExpiresAt: verification.expiresAt,
        emailVerificationSentAt: new Date(),
        portalProfile,
    }));
    const previewUrl = buildVerificationPreviewUrl(verification.token);
    logVerificationPreview(normalizedEmail, previewUrl);
    return {
        user: serializePortalUser(user),
        sessionUser: toPortalSessionUser(serializePortalUser(user)),
        verificationPreviewUrl: previewUrl,
    };
}
export async function authenticatePortalUser(payload) {
    const normalizedEmail = normalizeEmail(payload.email);
    const user = (await findUserByEmailAndRole(normalizedEmail, payload.role));
    if (!user || !user.active) {
        throw new ApiError(401, "Invalid email or password.", { code: "INVALID_CREDENTIALS" });
    }
    const isValidPassword = await verifyPassword(payload.password, user.passwordHash);
    if (!isValidPassword) {
        throw new ApiError(401, "Invalid email or password.", { code: "INVALID_CREDENTIALS" });
    }
    await updateUser(user.id, { lastLoginAt: new Date() });
    const serializedUser = serializePortalUser(user);
    return {
        user: serializedUser,
        sessionUser: toPortalSessionUser(serializedUser),
    };
}
export async function getPortalSessionById(userId) {
    const user = await findPortalUserById(userId);
    if (!user || !user.active) {
        return null;
    }
    return serializePortalUser(user);
}
export async function updatePortalProfile(userId, role, payload) {
    const user = await findPortalUserById(userId);
    if (!user || !user.active || user.role !== role) {
        throw new ApiError(404, "Portal account not found.", { code: "PORTAL_USER_NOT_FOUND" });
    }
    if (payload.name !== undefined) {
        user.name = payload.name.trim();
    }
    const portalProfile = role === "student"
        ? buildStudentProfile(payload.profile, user.portalProfile)
        : buildTutorProfile(payload.profile, user.portalProfile);
    const updatedUser = await updateUser(user.id, {
        name: user.name,
        portalProfile,
    });
    return serializePortalUser(updatedUser);
}
export async function resendPortalVerification(userId) {
    const user = await findPortalUserById(userId);
    if (!user || !user.active) {
        throw new ApiError(404, "Portal account not found.", { code: "PORTAL_USER_NOT_FOUND" });
    }
    if (user.emailVerifiedAt) {
        return {
            user: serializePortalUser(user),
            verificationPreviewUrl: null,
        };
    }
    const verification = createVerificationToken();
    const updatedUser = await updateUser(user.id, {
        emailVerificationTokenHash: verification.tokenHash,
        emailVerificationExpiresAt: verification.expiresAt,
        emailVerificationSentAt: new Date(),
    });
    const previewUrl = buildVerificationPreviewUrl(verification.token);
    logVerificationPreview(updatedUser?.email ?? user.email, previewUrl);
    return {
        user: serializePortalUser((updatedUser ?? user)),
        verificationPreviewUrl: previewUrl,
    };
}
export async function verifyPortalEmail(token) {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = (await findPortalUserByVerificationToken(tokenHash));
    if (!user || !isPortalRole(user.role) || !user.active) {
        throw new ApiError(400, "This verification link is invalid or has expired.", {
            code: "INVALID_VERIFICATION_TOKEN",
            details: createFieldErrorDetails("token", "This verification link is invalid or has expired."),
        });
    }
    const updatedUser = await updateUser(user.id, {
        emailVerifiedAt: new Date(),
        emailVerificationTokenHash: "",
        emailVerificationExpiresAt: null,
    });
    return serializePortalUser(updatedUser);
}
//# sourceMappingURL=portalAuthService.js.map