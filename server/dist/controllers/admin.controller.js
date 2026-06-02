"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentActivity = exports.togglePublishPost = exports.deletePost = exports.getAllPosts = exports.deleteUser = exports.getAllUsers = exports.getAdminStats = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
exports.getAdminStats = (0, asyncHandler_1.default)(async (_req, res) => {
    const totalUsers = await prisma_1.default.user.count();
    const totalPosts = await prisma_1.default.post.count();
    const totalComments = await prisma_1.default.comment.count();
    const totalBookmarks = await prisma_1.default.bookmark.count();
    const totalLikes = await prisma_1.default.like.count();
    const publishedPosts = await prisma_1.default.post.count({
        where: {
            published: true,
        },
    });
    const draftPosts = await prisma_1.default.post.count({
        where: {
            published: false,
        },
    });
    const mostViewedPost = await prisma_1.default.post.findFirst({
        orderBy: {
            views: "desc",
        },
        select: {
            title: true,
            views: true,
        },
    });
    const categoryStats = await prisma_1.default.post.groupBy({
        by: ["category"],
        _count: {
            category: true,
        },
    });
    const categoryViews = await prisma_1.default.post.groupBy({
        by: ["category"],
        _sum: {
            views: true,
        },
    });
    const allPosts = await prisma_1.default.post.findMany({
        select: {
            createdAt: true,
        },
    });
    const monthlyPosts = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ].map((month, index) => ({
        month,
        posts: allPosts.filter((post) => new Date(post.createdAt).getMonth() === index).length,
    }));
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
        categoryStats,
        categoryViews,
        monthlyPosts,
    });
});
exports.getAllUsers = (0, asyncHandler_1.default)(async (_req, res) => {
    const users = await prisma_1.default.user.findMany({
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
});
exports.deleteUser = (0, asyncHandler_1.default)(async (req, res) => {
    try {
        const userId = String(req.params.userId);
        console.log("Deleting user:", userId);
        await prisma_1.default.comment.deleteMany({
            where: { userId },
        });
        await prisma_1.default.like.deleteMany({
            where: { userId },
        });
        await prisma_1.default.bookmark.deleteMany({
            where: { userId },
        });
        await prisma_1.default.post.deleteMany({
            where: {
                authorId: userId,
            },
        });
        await prisma_1.default.user.delete({
            where: {
                id: userId,
            },
        });
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getAllPosts = (0, asyncHandler_1.default)(async (_req, res) => {
    const posts = await prisma_1.default.post.findMany({
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
});
exports.deletePost = (0, asyncHandler_1.default)(async (req, res) => {
    const postId = String(req.params.postId);
    await prisma_1.default.comment.deleteMany({
        where: {
            postId,
        },
    });
    await prisma_1.default.like.deleteMany({
        where: {
            postId,
        },
    });
    await prisma_1.default.bookmark.deleteMany({
        where: {
            postId,
        },
    });
    await prisma_1.default.post.delete({
        where: {
            id: postId,
        },
    });
    res.status(200).json({
        success: true,
        message: "Post deleted successfully",
    });
});
exports.togglePublishPost = (0, asyncHandler_1.default)(async (req, res) => {
    const postId = req.params.postId;
    const post = await prisma_1.default.post.findUnique({
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
    const updatedPost = await prisma_1.default.post.update({
        where: {
            id: postId,
        },
        data: {
            published: !post.published,
        },
    });
    res.status(200).json({
        success: true,
        post: updatedPost,
    });
});
exports.getRecentActivity = (0, asyncHandler_1.default)(async (_req, res) => {
    const recentUsers = await prisma_1.default.user.findMany({
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
    const recentPosts = await prisma_1.default.post.findMany({
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
});
