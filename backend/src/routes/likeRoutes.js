import { Router, Router } from "express";
import authMiddleware from "../middlewares/authMiddlewares";
import { getPostLikes, likePost, unlikePost } from "../controllers/like.js";

const router = Router();
router.get("/:postId/likes", authMiddleware, getPostLikes);
router.post("/:postId/like", authMiddleware, likePost);
router.delete("/:postId/unlike", authMiddleware, unlikePost);

export default router;
