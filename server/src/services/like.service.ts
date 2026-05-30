import prisma from "../config/prisma";
import AppError from "../utils/AppError";

export const toggleLikeService =
  async (
    postId: string,
    userId: string
  ) => {
    const post =
      await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

    if (!post) {
      throw new AppError(
        "Post not found",
        404
      );
    }

    const existingLike =
      await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return {
        liked: false,
        message: "Post unliked",
      };
    }

    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });

    return {
      liked: true,
      message: "Post liked",
    };
  };

export const getLikesCountService =
  async (postId: string) => {
    const likesCount =
      await prisma.like.count({
        where: {
          postId,
        },
      });

    return likesCount;
  };