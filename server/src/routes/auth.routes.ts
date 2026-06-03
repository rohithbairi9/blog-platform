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
import sendEmail from "../utils/sendEmail";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/verify/:token", verifyEmail);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword);

router.get("/me", authMiddleware, getMe);

router.get("/test-email", async (_, res) => {
  await sendEmail(
    process.env.EMAIL_USER!,
    "Test Email",
    "<h1>Email Working</h1>"
  );

  res.send("Email Sent");
});

export default router;