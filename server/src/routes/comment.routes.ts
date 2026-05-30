import { Router } from "express";

import {
  createComment,
  getCommentsByPost,
  deleteComment,
  updateComment,
} from "../controllers/comment.controller";

import authMiddleware
from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/post/:postId",
  getCommentsByPost
);

router.post(
  "/",
  authMiddleware,
  createComment
);

router.put(
  "/:id",
  authMiddleware,
  updateComment
);

router.delete(
  "/:id",
  authMiddleware,
  deleteComment
);

export default router;