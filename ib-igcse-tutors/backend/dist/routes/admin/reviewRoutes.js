import { Router } from "express";
import { requireRole } from "../../auth/accessControl.js";
import { ADMIN_DELETE_ROLES } from "../../auth/roles.js";
import { createReviewController, deleteReviewController, getReviewController, listReviewsController, updateReviewController, } from "../../controllers/reviewController.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const reviewRoutes = Router();
reviewRoutes.get("/", asyncHandler(listReviewsController));
reviewRoutes.get("/:id", asyncHandler(getReviewController));
reviewRoutes.post("/", asyncHandler(createReviewController));
reviewRoutes.put("/:id", asyncHandler(updateReviewController));
reviewRoutes.delete("/:id", requireRole(ADMIN_DELETE_ROLES), asyncHandler(deleteReviewController));
export default reviewRoutes;
//# sourceMappingURL=reviewRoutes.js.map