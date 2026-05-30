import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../types/auth.types";

import { createCommentSchema }
from "../validators/comment.validator";

import {
  createCommentService,
  getCommentsByPostService,
  deleteCommentService,
  updateCommentService,
} from "../services/comment.service";

export const createComment =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const validatedData =
        createCommentSchema.parse(
          req.body
        );

      const comment =
        await createCommentService({
          ...validatedData,
          userId: req.userId!,
        });

      return res.status(201).json({
        success: true,
        message:
          "Comment created successfully",
        comment,
      });
    }
  );

export const getCommentsByPost =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const { postId } = req.params as {postId: string;};

      const comments =
        await getCommentsByPostService(
          postId
        );

      res.status(200).json({
        success: true,
        count: comments.length,
        comments,
      });
    }
  );
export const deleteComment =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const id = req.params.id as string;

      await deleteCommentService(id);

      res.status(200).json({
        success: true,
        message:
          "Comment deleted successfully",
      });
    }
  );

export const updateComment =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const id =
        req.params.id as string;

      const { content } =
        req.body;

      const comment =
        await updateCommentService(
          id,
          content
        );

      res.status(200).json({
        success: true,
        message:
          "Comment updated successfully",
        comment,
      });
    }
  );