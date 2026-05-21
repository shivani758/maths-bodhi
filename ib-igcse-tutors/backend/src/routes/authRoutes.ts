import { Router } from "express";
import { requireAuth } from "../auth/accessControl.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginController, logoutController, sessionController } from "../controllers/authController.js";
import { createRateLimiter } from "../middleware/rateLimit.js";

const authRoutes = Router();
const adminLoginRateLimiter = createRateLimiter({
  keyPrefix: "admin-login",
  windowMs: 15 * 60 * 1000,
  maxAttempts: 10,
  getIdentity: (req) => String(req.body?.identifier ?? ""),
});

authRoutes.post("/login", adminLoginRateLimiter, asyncHandler(loginController));
authRoutes.post("/logout", requireAuth, asyncHandler(logoutController));
authRoutes.get("/session", asyncHandler(sessionController));

export default authRoutes;
