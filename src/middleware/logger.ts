import { Request, Response, NextFunction } from "express";

/**
 * Middleware to log API route, status, and timestamp for each request.
 */
export function apiLogger(req: Request, res: Response, next: NextFunction) {
  res.on("finish", () => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode}`;
    console.info(log);
  });
  next();
}
