import { Router } from "express";
import { getUserProfile } from "../controllers/user";

const router = Router();

/**
 * @route GET /user/me
 * @desc Returns user profile information with a random cat fact
 */
router.get("/", getUserProfile);

export default router;
