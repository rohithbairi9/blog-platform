import prisma from "../config/prisma";
import generateSlug from "../utils/generateSlug";
import AppError from "../utils/AppError";

interface CreatePostData {
  title: string;
  content: string;
  coverImage?: string;
  published?: boolean;

  category?: string;
  tags?: string[];

  authorId: string;
}

export const createPostService =
  async (data: CreatePostData) => {
    const slug =
      generateSlug(data.title);

    const existingPost =
      await prisma.post.findUnique({
        where: {
          slug,
        },
      });

    if (existingPost) {
      throw new AppError(
       "Post with this title already exists",
       400
      );
    }

return prisma.post.create({
  data: {
    title: data.title,
    slug,
    content: data.content,
    coverImage: data.coverImage,
    published: data.published ?? true,

    category: data.category,
    tags: data.tags ?? [],

    authorId: data.authorId,
  },
});
  };

export const getAllPostsService = async (
  page: number,
  limit: number,
  search?: string,
  category?: string
) => {
  const skip = (page - 1) * limit;

const where: any = {};

if (search) {
  where.OR = [
    {
      title: {
        contains: search,
      },
    },
    {
      content: {
        contains: search,
      },
    },
  ];
}

if (category) {
  where.category = category;
}

  const posts = await prisma.post.findMany({
    where,
    skip,
    take: limit,

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

  const total = await prisma.post.count({
    where,
  });

  return {
    posts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const getPostBySlugService =
  async (slug: string) => {
    return prisma.post.findUnique({
      where: {
        slug,
      },

      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  };

export const getPostByIdService =
  async (id: string) => {
    return prisma.post.findUnique({
      where: {
        id,
      },
    });
  };

interface UpdatePostData {
  title?: string;
  content?: string;
  coverImage?: string;
  published?: boolean;

  category?: string;
  tags?: string[];
}

export const updatePostService =
  async (
    id: string,
    data: UpdatePostData
  ) => {
    return prisma.post.update({
      where: {
        id,
      },
      data,
    });
  };

export const deletePostService =
  async (id: string) => {
    return prisma.post.delete({
      where: {
        id,
      },
    });
  };

export const incrementPostViewsService =
  async (slug: string) => {
    return prisma.post.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },

      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  };

export const getRelatedPostsService =
  async (
    postId: string,
    category?: string
  ) => {
    return prisma.post.findMany({
      where: {
        id: {
          not: postId,
        },

        category,
      },

      take: 3,

      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  };