import { Request, Response } from "express";
import bcrypt from "bcrypt";

import prisma from "../config/prisma";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../middlewares/auth.middleware";

import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData =
      registerSchema.parse(req.body);

    const { name, email, password } =
      validatedData;

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

const verificationToken =
  uuidv4();

const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,

    verified: false,
    verificationToken,
  },
});

const verificationUrl =
  `http://localhost:3000/verify-email?token=${verificationToken}`;

await sendEmail(
  email,
  "Verify Your Account",
  `
    <h2>Welcome to Blog Platform</h2>

    <p>Click the link below to verify your account:</p>

    <a href="${verificationUrl}">
      Verify Account
    </a>
  `
);

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message:
  "Registration successful. Please check your email to verify your account.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData =
      loginSchema.parse(req.body);

    const { email, password } =
      validatedData;

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.verified) {
  return res.status(401).json({
    success: false,
    message:
      "Please verify your email first",
  });
}

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token =
      generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge:
        7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logoutUser = async (
  _req: Request,
  res: Response
) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

export const getMe = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const verifyEmail = async (
  req: Request,
  res: Response
) => {
  const token = req.params.token as string;

  const user =
    await prisma.user.findFirst({
      where: {
        verificationToken: token,
      },
    });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      verified: true,
      verificationToken: null,
    },
  });

return res.status(200).json({
  success: true,
  message: "Email verified successfully",
});
};
export const forgotPassword = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  const user =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const resetToken =
    crypto.randomBytes(32).toString("hex");

  const resetPasswordExpiry =
    new Date(
      Date.now() + 15 * 60 * 1000
    );

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetPasswordToken:
        resetToken,
      resetPasswordExpiry,
    },
  });

  const resetUrl =
    `http://localhost:3000/reset-password/${resetToken}`;

  await sendEmail(
    user.email,
    "Reset Your Password",
    `
      <h2>Password Reset</h2>

      <p>
        Click the link below to reset your password:
      </p>

      <a href="${resetUrl}">
        Reset Password
      </a>
    `
  );

  return res.json({
    success: true,
    message:
      "Password reset email sent",
  });
};

export const resetPassword = async (
  req: Request,
  res: Response
) => {
  const token = req.params.token as string;

  const { password } = req.body;

  const user =
    await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiry: {
          gt: new Date(),
        },
      },
    });

  if (!user) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid or expired token",
    });
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpiry: null,
    },
  });

  return res.json({
    success: true,
    message:
      "Password reset successfully",
  });
};