// src/routes/user.routes.ts

import { Router } from "express";

import authMiddleware
from "../middlewares/auth.middleware";

import { makeAdmin } from "../controllers/user.controller";

import {
  getProfile,
  updateProfile,
  getUserById,
} from "../controllers/user.controller";

import adminMiddleware from "../middlewares/admin.middleware";

const router = Router();

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.get(
  "/:id",
  getUserById
);

router.put(
  "/make-admin/:userId",
  authMiddleware,
  adminMiddleware,
  makeAdmin
);

export default router;