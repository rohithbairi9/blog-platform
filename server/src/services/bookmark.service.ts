import prisma from "../config/prisma";
import AppError from "../utils/AppError";

export const toggleBookmarkService =
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

    const existingBookmark =
      await prisma.bookmark.findUnique({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      });

      return {
        bookmarked: false,
        message: "Bookmark removed",
      };
    }

    await prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
    });

    return {
      bookmarked: true,
      message: "Post bookmarked",
    };
  };

export const getBookmarksService =
  async (userId: string) => {
    return prisma.bookmark.findMany({
      where: {
        userId,
      },

      include: {
        post: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  };