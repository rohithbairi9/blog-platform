import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/verify/:token", verifyEmail);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword);

router.get("/me", authMiddleware, getMe);

export default router;