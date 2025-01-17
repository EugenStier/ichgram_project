import { Router } from "express";
import authMiddleware from "../middlewares/authMiddlewares.js";
import {
  followUser,
  getUserFollowers,
  getUserFollowing,
  unfollowUser,
} from "../controllers/follow.js";

const router = Router();

router.get("/:userId/followers", getUserFollowers);
router.get("/:userId/following", getUserFollowing);
router.post("/:target_user_id/follow", authMiddleware, followUser);
router.delete("/:target_user_id/unfollow", authMiddleware, unfollowUser);

export default router;
