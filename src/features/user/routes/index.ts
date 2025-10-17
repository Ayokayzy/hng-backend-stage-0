import { Router } from "express";
import { getUserProfile } from "../controllers/user";

const router = Router();

/**
 * @route GET /user/me
 * @desc Returns user profile information with a random cat fact
 */
router.get("/me", getUserProfile);

export default router;
