import { Router } from "express";
import authMiddleware from "../middlewares/authMiddlewares.js";
import {
  createPost,
  deletePost,
  getUserPosts,
  getPostById,
  updatePost,
} from "../controllers/post.js";

const router = Router();
router.post("/", authMiddleware, createPost);
router.get("/single/:postId", authMiddleware, getPostById);
router.put("/:postId", authMiddleware, updatePost);
router.delete("/:postId", authMiddleware, deletePost);
router.get("/all", authMiddleware, getUserPosts);

export default router;
