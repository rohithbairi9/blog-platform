"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikesCountService = exports.toggleLikeService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const toggleLikeService = async (postId, userId) => {
    const post = await prisma_1.default.post.findUnique({
        where: {
            id: postId,
        },
    });
    if (!post) {
        throw new AppError_1.default("Post not found", 404);
    }
    const existingLike = await prisma_1.default.like.findUnique({
        where: {
            userId_postId: {
                userId,
                postId,
            },
        },
    });
    if (existingLike) {
        await prisma_1.default.like.delete({
            where: {
                id: existingLike.id,
            },
        });
        return {
            liked: false,
            message: "Post unliked",
        };
    }
    await prisma_1.default.like.create({
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
exports.toggleLikeService = toggleLikeService;
const getLikesCountService = async (postId) => {
    const likesCount = await prisma_1.default.like.count({
        where: {
            postId,
        },
    });
    return likesCount;
};
exports.getLikesCountService = getLikesCountService;
