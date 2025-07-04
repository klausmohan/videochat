import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
} from "../controllers/user.controller.js";

const router = express.Router();

// ✅ All routes below are protected
router.use(protectRoute);

// 📌 User recommendations & friends
router.get("/", getRecommendedUsers); // /api/users
router.get("/friends", getMyFriends); // /api/users/friends

// 📌 Friend request handling
router.post("/friend-request/:id", sendFriendRequest); // /api/users/friend-request/:id
router.put("/friend-request/:id/accept", acceptFriendRequest); // /api/users/friend-request/:id/accept

// 📌 View incoming/outgoing requests
router.get("/friend-requests", getFriendRequests); // /api/users/friend-requests
router.get("/outgoing-friend-requests", getOutgoingFriendReqs); // /api/users/outgoing-friend-requests

export default router;
