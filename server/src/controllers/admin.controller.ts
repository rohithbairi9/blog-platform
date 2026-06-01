import { Request, Response } from "express";
import prisma from "../config/prisma";
import asyncHandler from "../utils/asyncHandler";

export const getAdminStats =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {
      const totalUsers =
        await prisma.user.count();

      const totalPosts =
        await prisma.post.count();

      const totalComments =
        await prisma.comment.count();

      const totalBookmarks =
        await prisma.bookmark.count();

      const totalLikes =
        await prisma.like.count();

      const publishedPosts =
  await prisma.post.count({
    where: {
      published: true,
    },
  });

const draftPosts =
  await prisma.post.count({
    where: {
      published: false,
    },
  });

const mostViewedPost =
  await prisma.post.findFirst({
    orderBy: {
      views: "desc",
    },
    select: {
      title: true,
      views: true,
    },
  });

      res.status(200).json({
        success: true,
        totalUsers,
        totalPosts,
        totalComments,
        totalBookmarks,
        totalLikes,
        publishedPosts,
        draftPosts,
        mostViewedPost,
      });
    }
  );

export const getAllUsers =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {
      const users =
        await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        });

      res.status(200).json({
        success: true,
        count: users.length,
        users,
      });
    }
  );

export const deleteUser =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      try {
        const userId = String(req.params.userId);

        console.log(
          "Deleting user:",
          userId
        );

        await prisma.comment.deleteMany({
          where: { userId },
        });

        await prisma.like.deleteMany({
          where: { userId },
        });

        await prisma.bookmark.deleteMany({
          where: { userId },
        });

        await prisma.post.deleteMany({
          where: {
            authorId: userId,
          },
        });

        await prisma.user.delete({
          where: {
            id: userId,
          },
        });

        res.status(200).json({
          success: true,
          message:
            "User deleted successfully",
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

export const getAllPosts =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {
      const posts =
        await prisma.post.findMany({
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

      res.status(200).json({
        success: true,
        count: posts.length,
        posts,
      });
    }
  );

export const deletePost =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const postId =
        String(req.params.postId);

      await prisma.comment.deleteMany({
        where: {
          postId,
        },
      });

      await prisma.like.deleteMany({
        where: {
          postId,
        },
      });

      await prisma.bookmark.deleteMany({
        where: {
          postId,
        },
      });

      await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      res.status(200).json({
        success: true,
        message:
          "Post deleted successfully",
      });
    }
  );

export const togglePublishPost =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
     const postId =
  req.params.postId as string;

      const post =
        await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      const updatedPost =
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            published:
              !post.published,
          },
        });

      res.status(200).json({
        success: true,
        post: updatedPost,
      });
    }
  );

export const getRecentActivity =
  asyncHandler(
    async (
      _req: Request,
      res: Response
    ) => {

      const recentUsers =
        await prisma.user.findMany({
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        });

      const recentPosts =
        await prisma.post.findMany({
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            title: true,
            createdAt: true,
          },
        });

      res.status(200).json({
        success: true,
        recentUsers,
        recentPosts,
      });
    }
  );