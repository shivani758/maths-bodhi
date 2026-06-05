import { Router } from "express";
import {
  getPublicBootstrapController,
  getPublicTutorController,
  listPublicTutorSummariesController,
} from "../controllers/publicController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const publicRoutes = Router();

publicRoutes.get("/bootstrap", asyncHandler(getPublicBootstrapController));
publicRoutes.get("/tutors/summary", asyncHandler(listPublicTutorSummariesController));
publicRoutes.get("/tutors/:slugOrId", asyncHandler(getPublicTutorController));

export default publicRoutes;
