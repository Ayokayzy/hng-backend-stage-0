import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

/**
 * Global error handler middleware for Express.
 * Catches errors passed with next(error) and sends a consistent error response.
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status =
    err instanceof ApiError && err.statusCode ? err.statusCode : 500;
  const message =
    err instanceof Error && err.message ? err.message : "Internal server error";

  res.status(status).json({
    statusCode: status,
    status: "error",
    error: message,
  });
}
