import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../types/auth.types";

import {
  toggleLikeService,
  getLikesCountService,
} from "../services/like.service";

export const toggleLike =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const postId =
        req.params.postId as string;

      const result =
        await toggleLikeService(
          postId,
          req.userId!
        );

      res.status(200).json({
        success: true,
        ...result,
      });
    }
  );

export const getLikesCount =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const postId =
        req.params.postId as string;

      const likesCount =
        await getLikesCountService(
          postId
        );

      res.status(200).json({
        success: true,
        likesCount,
      });
    }
  );