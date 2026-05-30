// src/controllers/user.controller.ts

import { Response } from "express";

import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../types/auth.types";

import {
  getProfileService,
  updateProfileService,
} from "../services/user.service";

import prisma from "../config/prisma";

export const getProfile = asyncHandler(
  async (
    req: AuthRequest,
    res: Response
  ) => {
    const user =
      await getProfileService(
        req.userId!
      );

    res.status(200).json({
      success: true,
      user,
    });
  }
);

export const updateProfile = asyncHandler(
  async (
    req: AuthRequest,
    res: Response
  ) => {
    const user =
      await updateProfileService(
        req.userId!,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      user,
    });
  }
);

export const makeAdmin =
  asyncHandler(
    async (req: any, res: Response) => {
      const { userId } = req.params;

      const user = await prisma.user.update({
  where: {
    id: userId,
  },
  data: {
    role: "ADMIN",
  },
  select: {
    id: true,
    name: true,
    email: true,
    avatar: true,
    role: true,
    createdAt: true,
  },
});

      res.status(200).json({
        success: true,
        message: "User promoted to ADMIN",
        user,
      });
    }
  );