import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";
import { zodErrorToDetails } from "../utils/validationDetails.js";
import { isProduction } from "../config/env.js";

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        code: error.code,
        details: error.details,
      },
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation failed.",
        code: "VALIDATION_ERROR",
        details: zodErrorToDetails(error),
      },
    });
  }

  const fallbackMessage =
    !isProduction && error instanceof Error ? error.message : "Unexpected server error.";

  return res.status(500).json({
    success: false,
    error: {
      message: fallbackMessage,
      code: "INTERNAL_SERVER_ERROR",
    },
  });
}
