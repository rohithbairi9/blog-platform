import { Router } from "express";

import authMiddleware
from "../middlewares/auth.middleware";

import {
  toggleLike,
  getLikesCount,
} from "../controllers/like.controller";

const router = Router();

router.post(
  "/:postId",
  authMiddleware,
  toggleLike
);

router.get(
  "/:postId",
  getLikesCount
);

export default router;