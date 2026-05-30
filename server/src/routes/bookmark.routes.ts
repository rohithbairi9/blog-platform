import { Router } from "express";

import authMiddleware
from "../middlewares/auth.middleware";

import {
  toggleBookmark,
  getBookmarks,
} from "../controllers/bookmark.controller";

const router = Router();

router.post(
  "/:postId",
  authMiddleware,
  toggleBookmark
);

router.get(
  "/",
  authMiddleware,
  getBookmarks
);

export default router;