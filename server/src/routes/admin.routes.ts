import { Router } from "express";

import authMiddleware
from "../middlewares/auth.middleware";

import adminMiddleware
from "../middlewares/admin.middleware";

import {
  getAdminStats,
  getAllUsers,
  deleteUser,
  getAllPosts,
  deletePost,
  togglePublishPost,
  getRecentActivity,
} from "../controllers/admin.controller";

const router = Router();

router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getAdminStats
);

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

router.delete(
  "/users/:userId",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

router.get(
  "/posts",
  authMiddleware,
  adminMiddleware,
  getAllPosts
);

router.delete(
  "/posts/:postId",
  authMiddleware,
  adminMiddleware,
  deletePost
);

router.patch(
  "/posts/:postId/toggle-publish",
  authMiddleware,
  adminMiddleware,
  togglePublishPost
);

router.get(
  "/recent-activity",
  authMiddleware,
  adminMiddleware,
  getRecentActivity
);

export default router;