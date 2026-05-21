import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createSessionMiddleware } from "./auth/session.js";
import { requireRole } from "./auth/accessControl.js";
import { ADMIN_PANEL_ROLES } from "./auth/roles.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFound.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/admin/blogRoutes.js";
import dashboardRoutes from "./routes/admin/dashboardRoutes.js";
import pageRoutes from "./routes/admin/pageRoutes.js";
import reviewRoutes from "./routes/admin/reviewRoutes.js";
import studentResultRoutes from "./routes/admin/studentResultRoutes.js";
import tutorRoutes from "./routes/admin/tutorRoutes.js";
import portalAuthRoutes from "./routes/portalAuthRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import { listPublicBlogsController, listPublicReviewsController, listPublicTutorsController, } from "./controllers/publicController.js";
import { asyncHandler } from "./utils/asyncHandler.js";
export function createApp() {
    const app = express();
    const allowedOrigins = new Set(env.FRONTEND_ORIGINS);
    const corsOptions = {
        origin(origin, callback) {
            if (!origin || allowedOrigins.has(origin)) {
                callback(null, true);
                return;
            }
            callback(null, false);
        },
        credentials: true,
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    };
    const corsMiddleware = cors(corsOptions);
    if (env.NODE_ENV !== "production") {
        allowedOrigins.add("http://localhost:5173");
        allowedOrigins.add("http://127.0.0.1:5173");
        allowedOrigins.add("http://localhost:4173");
        allowedOrigins.add("http://127.0.0.1:4173");
    }
    app.set("trust proxy", 1);
    app.options("/api/auth/login", corsMiddleware);
    app.use(corsMiddleware);
    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
    app.use(createSessionMiddleware());
    app.get("/api/health", (_req, res) => {
        res.json({ success: true, message: "API is working" });
    });
    app.use("/api/auth", authRoutes);
    app.use("/api/portal-auth", portalAuthRoutes);
    app.use("/api/public", publicRoutes);
    app.get("/api/tutors", asyncHandler(listPublicTutorsController));
    app.get("/api/blogs", asyncHandler(listPublicBlogsController));
    app.get("/api/reviews", asyncHandler(listPublicReviewsController));
    app.use("/api/admin/dashboard", requireRole(ADMIN_PANEL_ROLES), dashboardRoutes);
    app.use("/api/admin/tutors", requireRole(ADMIN_PANEL_ROLES), tutorRoutes);
    app.use("/api/admin/blogs", requireRole(ADMIN_PANEL_ROLES), blogRoutes);
    app.use("/api/admin/pages", requireRole(ADMIN_PANEL_ROLES), pageRoutes);
    app.use("/api/admin/reviews", requireRole(ADMIN_PANEL_ROLES), reviewRoutes);
    app.use("/api/admin/results", requireRole(ADMIN_PANEL_ROLES), studentResultRoutes);
    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map