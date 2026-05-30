"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentService = exports.deleteCommentService = exports.getCommentsByPostService = exports.createCommentService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const createCommentService = async (data) => {
    const post = await prisma_1.default.post.findUnique({
        where: {
            id: data.postId,
        },
    });
    if (!post) {
        throw new AppError_1.default("Post not found", 404);
    }
    return prisma_1.default.comment.create({
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
exports.createCommentService = createCommentService;
const getCommentsByPostService = async (postId) => {
    return prisma_1.default.comment.findMany({
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
exports.getCommentsByPostService = getCommentsByPostService;
const deleteCommentService = async (id) => {
    const comment = await prisma_1.default.comment.findUnique({
        where: {
            id,
        },
    });
    if (!comment) {
        throw new AppError_1.default("Comment not found", 404);
    }
    await prisma_1.default.comment.delete({
        where: {
            id,
        },
    });
};
exports.deleteCommentService = deleteCommentService;
const updateCommentService = async (id, content) => {
    const comment = await prisma_1.default.comment.findUnique({
        where: {
            id,
        },
    });
    if (!comment) {
        throw new AppError_1.default("Comment not found", 404);
    }
    return prisma_1.default.comment.update({
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
exports.updateCommentService = updateCommentService;
