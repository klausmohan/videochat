import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const router = express.Router();

// 🎯 Get Stream Chat/Video token for authenticated user
router.get("/token", protectRoute, getStreamToken);

export default router;
