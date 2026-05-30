import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";

import { uploadImage } from "../controllers/upload.controller";

const router = Router();

router.post(
  "/image",
  authMiddleware,
  upload.single("image"),
  uploadImage
);

export default router;