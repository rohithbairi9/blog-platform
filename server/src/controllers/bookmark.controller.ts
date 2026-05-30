import { Response } from "express";

import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../types/auth.types";

import {
  toggleBookmarkService,
  getBookmarksService,
} from "../services/bookmark.service";

export const toggleBookmark =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const postId =
        req.params.postId as string;

      const result =
        await toggleBookmarkService(
          postId,
          req.userId!
        );

      res.status(200).json({
        success: true,
        ...result,
      });
    }
  );

export const getBookmarks =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const bookmarks =
        await getBookmarksService(
          req.userId!
        );

      res.status(200).json({
        success: true,
        count: bookmarks.length,
        bookmarks,
      });
    }
  );