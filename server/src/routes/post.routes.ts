import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware";

import {
  createPost,
  getAllPosts,
  getPostBySlug,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
} from "../controllers/post.controller";

import { getCommentsByPost }
from "../controllers/comment.controller";

const router = Router();

router.get("/", getAllPosts);
router.get(
  "/my-posts",
  authMiddleware,
  getMyPosts
);
router.get("/:postId/comments", getCommentsByPost);
router.get("/:slug", getPostBySlug);
router.get("/", getAllPosts);

router.get("/id/:id", getPostById);

router.get("/:postId/comments", getCommentsByPost);

router.get("/:slug", getPostBySlug);

router.post(
  "/",
  authMiddleware,
  createPost
);

router.put(
  "/:id",
  authMiddleware,
  updatePost
);

router.delete(
  "/:id",
  authMiddleware,
  deletePost
);

export default router;