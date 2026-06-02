"use strict";
// import { Response } from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelatedPosts = exports.getMyPosts = exports.deletePost = exports.updatePost = exports.getPostById = exports.getPostBySlug = exports.getAllPosts = exports.createPost = void 0;
const post_validator_1 = require("../validators/post.validator");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const post_service_1 = require("../services/post.service");
const AppError_1 = __importDefault(require("../utils/AppError"));
const prisma_1 = __importDefault(require("../config/prisma"));
exports.createPost = (0, asyncHandler_1.default)(async (req, res) => {
    const validatedData = post_validator_1.createPostSchema.parse(req.body);
    const post = await (0, post_service_1.createPostService)({
        ...validatedData,
        authorId: req.userId,
    });
    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        post,
    });
});
exports.getAllPosts = (0, asyncHandler_1.default)(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search;
    const category = req.query.category;
    const result = await (0, post_service_1.getAllPostsService)(page, limit, search, category);
    res.status(200).json({
        success: true,
        ...result,
    });
});
exports.getPostBySlug = (0, asyncHandler_1.default)(async (req, res) => {
    const slug = String(req.params.slug);
    const post = await (0, post_service_1.incrementPostViewsService)(slug);
    if (!post) {
        throw new AppError_1.default("Post not found", 404);
    }
    return res.status(200).json({
        success: true,
        post,
    });
});
exports.getPostById = (0, asyncHandler_1.default)(async (req, res) => {
    const post = await (0, post_service_1.getPostByIdService)(String(req.params.id));
    if (!post) {
        throw new AppError_1.default("Post not found", 404);
    }
    return res.status(200).json({
        success: true,
        post,
    });
});
exports.updatePost = (0, asyncHandler_1.default)(async (req, res) => {
    const postId = String(req.params.id);
    const existingPost = await (0, post_service_1.getPostByIdService)(postId);
    if (!existingPost) {
        throw new AppError_1.default("Post not found", 404);
    }
    if (existingPost.authorId !==
        req.userId) {
        throw new AppError_1.default("You are not allowed to update this post", 403);
    }
    const validatedData = post_validator_1.updatePostSchema.parse(req.body);
    const updatedPost = await (0, post_service_1.updatePostService)(postId, validatedData);
    return res.status(200).json({
        success: true,
        message: "Post updated successfully",
        post: updatedPost,
    });
});
exports.deletePost = (0, asyncHandler_1.default)(async (req, res) => {
    const postId = String(req.params.id);
    const existingPost = await (0, post_service_1.getPostByIdService)(postId);
    if (!existingPost) {
        throw new AppError_1.default("Post not found", 404);
    }
    if (existingPost.authorId !==
        req.userId) {
        throw new AppError_1.default("You are not allowed to delete this post", 403);
    }
    await (0, post_service_1.deletePostService)(postId);
    return res.status(200).json({
        success: true,
        message: "Post deleted successfully",
    });
});
exports.getMyPosts = (0, asyncHandler_1.default)(async (req, res) => {
    const posts = await prisma_1.default.post.findMany({
        where: {
            authorId: req.userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    res.status(200).json({
        success: true,
        posts,
    });
});
exports.getRelatedPosts = (0, asyncHandler_1.default)(async (req, res) => {
    const postId = String(req.params.postId);
    const category = req.query.category;
    const posts = await (0, post_service_1.getRelatedPostsService)(postId, category);
    res.status(200).json({
        success: true,
        posts,
    });
});
