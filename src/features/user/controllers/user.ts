import { Request, Response, NextFunction } from "express";
import { getCatFact } from "../services/catFact";
import { getUserProfileData } from "../models/user";
import logger from "../../../utils/logger";
import { ApiError } from "../../../utils/ApiError";

/**
 * Handles the GET /user/me endpoint.
 *
 * Retrieves the current user's profile data and a random cat fact, then responds with both along with a timestamp.
 * If an error occurs during data retrieval or fetching the cat fact, the error is passed to the next middleware.
 *
 * This controller is used in the user feature to provide a fun, informative endpoint for authenticated users.
 */
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = getUserProfileData();
    const fact = await getCatFact();
    const timestamp = new Date().toISOString();

    // Example: throw new ApiError(404, "User not found");
    res.status(200).json({
      status: "success",
      user,
      timestamp,
      fact,
    });
  } catch (error) {
    next(error);
  }
};
