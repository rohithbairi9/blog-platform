import prisma from "../config/prisma";
import AppError from "../utils/AppError";

interface CreateCommentData {
  content: string;
  postId: string;
  userId: string;
}

export const createCommentService =
  async (
    data: CreateCommentData
  ) => {
    const post =
      await prisma.post.findUnique({
        where: {
          id: data.postId,
        },
      });

    if (!post) {
      throw new AppError(
        "Post not found",
        404
      );
    }

    return prisma.comment.create({
      data: {
        content: data.content,
        postId: data.postId,
        userId: data.userId,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  };

export const getCommentsByPostService =
  async (postId: string) => {
    return prisma.comment.findMany({
      where: {
        postId,
      },

      include: {
        user: {
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
  };

export const deleteCommentService =
  async (id: string) => {
    const comment =
      await prisma.comment.findUnique({
        where: {
          id,
        },
      });

    if (!comment) {
      throw new AppError(
        "Comment not found",
        404
      );
    }

    await prisma.comment.delete({
      where: {
        id,
      },
    });
  };

export const updateCommentService =
  async (
    id: string,
    content: string
  ) => {
    const comment =
      await prisma.comment.findUnique({
        where: {
          id,
        },
      });

    if (!comment) {
      throw new AppError(
        "Comment not found",
        404
      );
    }

    return prisma.comment.update({
      where: {
        id,
      },

      data: {
        content,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  };