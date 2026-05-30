"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookmarksService = exports.toggleBookmarkService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const toggleBookmarkService = async (postId, userId) => {
    const post = await prisma_1.default.post.findUnique({
        where: {
            id: postId,
        },
    });
    if (!post) {
        throw new AppError_1.default("Post not found", 404);
    }
    const existingBookmark = await prisma_1.default.bookmark.findUnique({
        where: {
            userId_postId: {
                userId,
                postId,
            },
        },
    });
    if (existingBookmark) {
        await prisma_1.default.bookmark.delete({
            where: {
                id: existingBookmark.id,
            },
        });
        return {
            bookmarked: false,
            message: "Bookmark removed",
        };
    }
    await prisma_1.default.bookmark.create({
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
exports.toggleBookmarkService = toggleBookmarkService;
const getBookmarksService = async (userId) => {
    return prisma_1.default.bookmark.findMany({
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
exports.getBookmarksService = getBookmarksService;
