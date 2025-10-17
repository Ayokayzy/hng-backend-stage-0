import axios from "axios";
import logger from "../../../utils/logger";
import { ApiError } from "../../../utils/ApiError";

/**
 * Fetches a random cat fact from the catfact.ninja public API.
 *
 * Makes an HTTP GET request to the external API and returns the fact as a string.
 * Throws an ApiError with status 502 if the API response is invalid or the request fails.
 *
 * This service is used by user-related controllers to provide fun facts alongside user data.
 *
 * @returns {Promise<string>} Resolves to a random cat fact string.
 * @throws {ApiError} If the API call fails or returns an invalid response.
 */
export const getCatFact = async (): Promise<string> => {
  try {
    const response = await axios.get<{ fact: string }>(
      "https://catfact.ninja/fact",
    );
    const fact = response.data?.fact;

    if (!fact) {
      throw new ApiError(502, "No cat fact returned from API");
    }

    return fact;
  } catch (error) {
    throw new ApiError(502, "Failed to fetch cat fact");
  }
};
