import { Router } from "express";
import { requireRole } from "../../auth/accessControl.js";
import { ADMIN_DELETE_ROLES } from "../../auth/roles.js";
import {
  createStudentResultController,
  deleteStudentResultController,
  getStudentResultController,
  listStudentResultsController,
  updateStudentResultController,
} from "../../controllers/studentResultController.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const studentResultRoutes = Router();

studentResultRoutes.get("/", asyncHandler(listStudentResultsController));
studentResultRoutes.get("/:id", asyncHandler(getStudentResultController));
studentResultRoutes.post("/", asyncHandler(createStudentResultController));
studentResultRoutes.put("/:id", asyncHandler(updateStudentResultController));
studentResultRoutes.delete("/:id", requireRole(ADMIN_DELETE_ROLES), asyncHandler(deleteStudentResultController));

export default studentResultRoutes;
