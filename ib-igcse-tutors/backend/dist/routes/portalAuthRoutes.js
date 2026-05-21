import { Router } from "express";
import { requirePortalAuth } from "../auth/accessControl.js";
import { portalLoginController, portalLogoutController, portalProfileUpdateController, portalResendVerificationController, portalSessionController, portalSignupController, portalVerifyEmailController, } from "../controllers/portalAuthController.js";
import { createRateLimiter } from "../middleware/rateLimit.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const portalAuthRoutes = Router();
const portalSignupRateLimiter = createRateLimiter({
    keyPrefix: "portal-signup",
    windowMs: 60 * 60 * 1000,
    maxAttempts: 8,
    getIdentity: (req) => String(req.body?.email ?? ""),
});
const portalLoginRateLimiter = createRateLimiter({
    keyPrefix: "portal-login",
    windowMs: 15 * 60 * 1000,
    maxAttempts: 12,
    getIdentity: (req) => String(req.body?.email ?? ""),
});
const portalVerificationRateLimiter = createRateLimiter({
    keyPrefix: "portal-verify",
    windowMs: 15 * 60 * 1000,
    maxAttempts: 20,
    getIdentity: (req) => String(req.body?.token ?? ""),
});
portalAuthRoutes.post("/signup", portalSignupRateLimiter, asyncHandler(portalSignupController));
portalAuthRoutes.post("/login", portalLoginRateLimiter, asyncHandler(portalLoginController));
portalAuthRoutes.post("/logout", requirePortalAuth, asyncHandler(portalLogoutController));
portalAuthRoutes.get("/session", asyncHandler(portalSessionController));
portalAuthRoutes.put("/profile", requirePortalAuth, asyncHandler(portalProfileUpdateController));
portalAuthRoutes.post("/resend-verification", requirePortalAuth, asyncHandler(portalResendVerificationController));
portalAuthRoutes.post("/verify-email", portalVerificationRateLimiter, asyncHandler(portalVerifyEmailController));
export default portalAuthRoutes;
//# sourceMappingURL=portalAuthRoutes.js.map