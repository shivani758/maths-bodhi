import { Router } from "express";
import { requireRole } from "../../auth/accessControl.js";
import { ADMIN_DELETE_ROLES } from "../../auth/roles.js";
import { createPageController, deletePageController, getPageController, listPagesController, updatePageController, } from "../../controllers/pageController.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const pageRoutes = Router();
pageRoutes.get("/", asyncHandler(listPagesController));
pageRoutes.get("/:id", asyncHandler(getPageController));
pageRoutes.post("/", asyncHandler(createPageController));
pageRoutes.put("/:id", asyncHandler(updatePageController));
pageRoutes.delete("/:id", requireRole(ADMIN_DELETE_ROLES), asyncHandler(deletePageController));
export default pageRoutes;
//# sourceMappingURL=pageRoutes.js.map