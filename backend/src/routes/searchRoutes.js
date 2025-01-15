import { Router } from "express";
import { searchUsers } from "../controllers/search.js";

const router = Router();
router.get("/users", searchUsers);
router.get("/posts", searchPosts);

export default router;
