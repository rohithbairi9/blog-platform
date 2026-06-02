// import { Response } from "express";

// import { AuthRequest } from "../middlewares/auth.middleware";

// import { createPostSchema } from "../validators/post.validator";

// import { createPostService } from "../services/post.service";

// export const createPost = async (
//   req: AuthRequest,
//   res: Response
// ) => {
//   try {
//     const validatedData =
//       createPostSchema.parse(req.body);

//     const post =
//       await createPostService({
//         ...validatedData,
//         authorId: req.userId!,
//       });

//     return res.status(201).json({
//       success: true,
//       message: "Post created successfully",
//       post,
//     });
//   } catch (error: any) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

import { Request, Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";

import {
  createPostSchema,
  updatePostSchema,
} from "../validators/post.validator";

import asyncHandler from "../utils/asyncHandler";

import {
  createPostService,
  getAllPostsService,
  getPostBySlugService,
  getPostByIdService,
  updatePostService,
  deletePostService,
  incrementPostViewsService,
  getRelatedPostsService,
} from "../services/post.service";

import { PostQuery } from "../types/post.types";

import AppError from "../utils/AppError";

import prisma from "../config/prisma";

export const createPost = asyncHandler(
  async (
    req: AuthRequest,
    res: Response
  ) => {
    const validatedData =
      createPostSchema.parse(req.body);

    const post =
      await createPostService({
        ...validatedData,
        authorId: req.userId!,
      });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  }
);

export const getAllPosts =
  asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const search =
      req.query.search as string;

    const category =
  req.query.category as string;

    const result =
      await getAllPostsService(
  page,
  limit,
  search,
  category
);

    res.status(200).json({
      success: true,
      ...result,
    });
  });

export const getPostBySlug =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const slug = String(req.params.slug);

      const post = await incrementPostViewsService(slug);

      if (!post) {
        throw new AppError(
          "Post not found",
          404
        );
      }

      return res.status(200).json({
        success: true,
        post,
      });
    }
  );

export const getPostById =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const post =
        await getPostByIdService(
          String(req.params.id)
        );

      if (!post) {
        throw new AppError(
          "Post not found",
          404
        );
      }

      return res.status(200).json({
        success: true,
        post,
      });
    }
  );

export const updatePost =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const postId =
        String(req.params.id);

      const existingPost =
        await getPostByIdService(
          postId
        );

      if (!existingPost) {
        throw new AppError(
          "Post not found",
          404
        );
      }

      if (
        existingPost.authorId !==
        req.userId
      ) {
        throw new AppError(
          "You are not allowed to update this post",
          403
        );
      }

      const validatedData =
        updatePostSchema.parse(
          req.body
        );

      const updatedPost =
        await updatePostService(
          postId,
          validatedData
        );

      return res.status(200).json({
        success: true,
        message:
          "Post updated successfully",
        post: updatedPost,
      });
    }
  );

export const deletePost =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const postId =
        String(req.params.id);

      const existingPost =
        await getPostByIdService(
          postId
        );

      if (!existingPost) {
        throw new AppError(
          "Post not found",
          404
        );
      }

      if (
        existingPost.authorId !==
        req.userId
      ) {
        throw new AppError(
          "You are not allowed to delete this post",
          403
        );
      }

      await deletePostService(
        postId
      );

      return res.status(200).json({
        success: true,
        message:
          "Post deleted successfully",
      });
    }
  );

export const getMyPosts =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const posts =
        await prisma.post.findMany({
          where: {
            authorId: req.userId!,
          },

          orderBy: {
            createdAt: "desc",
          },
        });

      res.status(200).json({
        success: true,
        posts,
      });
    }
  );

export const getRelatedPosts =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const postId =
        String(req.params.postId);

      const category =
        req.query.category as string;

      const posts =
        await getRelatedPostsService(
          postId,
          category
        );

      res.status(200).json({
        success: true,
        posts,
      });
    }
  );