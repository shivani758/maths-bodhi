import { Router } from "express";
import { requireRole } from "../../auth/accessControl.js";
import { ADMIN_DELETE_ROLES } from "../../auth/roles.js";
import { createBlogController, deleteBlogController, getBlogController, listBlogsController, updateBlogController, } from "../../controllers/blogController.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const blogRoutes = Router();
blogRoutes.get("/", asyncHandler(listBlogsController));
blogRoutes.get("/:id", asyncHandler(getBlogController));
blogRoutes.post("/", asyncHandler(createBlogController));
blogRoutes.put("/:id", asyncHandler(updateBlogController));
blogRoutes.delete("/:id", requireRole(ADMIN_DELETE_ROLES), asyncHandler(deleteBlogController));
export default blogRoutes;
//# sourceMappingURL=blogRoutes.js.map