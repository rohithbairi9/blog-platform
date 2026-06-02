"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelatedPostsService = exports.incrementPostViewsService = exports.deletePostService = exports.updatePostService = exports.getPostByIdService = exports.getPostBySlugService = exports.getAllPostsService = exports.createPostService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const generateSlug_1 = __importDefault(require("../utils/generateSlug"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const createPostService = async (data) => {
    const slug = (0, generateSlug_1.default)(data.title);
    const existingPost = await prisma_1.default.post.findUnique({
        where: {
            slug,
        },
    });
    if (existingPost) {
        throw new AppError_1.default("Post with this title already exists", 400);
    }
    return prisma_1.default.post.create({
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
exports.createPostService = createPostService;
const getAllPostsService = async (page, limit, search, category) => {
    const skip = (page - 1) * limit;
    const where = {};
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
    const posts = await prisma_1.default.post.findMany({
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
    const total = await prisma_1.default.post.count({
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
exports.getAllPostsService = getAllPostsService;
const getPostBySlugService = async (slug) => {
    return prisma_1.default.post.findUnique({
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
exports.getPostBySlugService = getPostBySlugService;
const getPostByIdService = async (id) => {
    return prisma_1.default.post.findUnique({
        where: {
            id,
        },
    });
};
exports.getPostByIdService = getPostByIdService;
const updatePostService = async (id, data) => {
    return prisma_1.default.post.update({
        where: {
            id,
        },
        data,
    });
};
exports.updatePostService = updatePostService;
const deletePostService = async (id) => {
    return prisma_1.default.post.delete({
        where: {
            id,
        },
    });
};
exports.deletePostService = deletePostService;
const incrementPostViewsService = async (slug) => {
    return prisma_1.default.post.update({
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
exports.incrementPostViewsService = incrementPostViewsService;
const getRelatedPostsService = async (postId, category) => {
    return prisma_1.default.post.findMany({
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
exports.getRelatedPostsService = getRelatedPostsService;
