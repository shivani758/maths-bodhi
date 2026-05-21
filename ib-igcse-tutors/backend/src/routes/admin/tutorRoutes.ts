import { Router } from "express";
import { requireRole } from "../../auth/accessControl.js";
import { ADMIN_DELETE_ROLES } from "../../auth/roles.js";
import {
  createTutorController,
  deleteTutorController,
  getTutorController,
  listTutorsController,
  updateTutorController,
} from "../../controllers/tutorController.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const tutorRoutes = Router();

tutorRoutes.get("/", asyncHandler(listTutorsController));
tutorRoutes.get("/:id", asyncHandler(getTutorController));
tutorRoutes.post("/", asyncHandler(createTutorController));
tutorRoutes.put("/:id", asyncHandler(updateTutorController));
tutorRoutes.delete("/:id", requireRole(ADMIN_DELETE_ROLES), asyncHandler(deleteTutorController));

export default tutorRoutes;
