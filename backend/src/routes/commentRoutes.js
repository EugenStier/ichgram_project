import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createComment,
  getPostComments,
  deleteComment,
} from "../controllers/comment.js";

const router = Router();

router.post("/:postId", authMiddleware, createComment);
router.get("/:postId", authMiddleware, getPostComments);
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
