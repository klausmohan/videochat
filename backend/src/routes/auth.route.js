import express from "express";
import {
  login,
  logout,
  onboard,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 */
router.post("/signup", signup);

/**
 * @route   POST /api/auth/login
 * @desc    Log in a user
 */
router.post("/login", login);

/**
 * @route   POST /api/auth/logout
 * @desc    Log out the current user
 */
router.post("/logout", logout);

/**
 * @route   POST /api/auth/onboarding
 * @desc    Save onboarding details (requires auth)
 */
router.post("/onboarding", protectRoute, onboard);

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user's info
 */
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;
