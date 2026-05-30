"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.deleteComment = exports.getCommentsByPost = exports.createComment = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const comment_validator_1 = require("../validators/comment.validator");
const comment_service_1 = require("../services/comment.service");
exports.createComment = (0, asyncHandler_1.default)(async (req, res) => {
    const validatedData = comment_validator_1.createCommentSchema.parse(req.body);
    const comment = await (0, comment_service_1.createCommentService)({
        ...validatedData,
        userId: req.userId,
    });
    return res.status(201).json({
        success: true,
        message: "Comment created successfully",
        comment,
    });
});
exports.getCommentsByPost = (0, asyncHandler_1.default)(async (req, res) => {
    const { postId } = req.params;
    const comments = await (0, comment_service_1.getCommentsByPostService)(postId);
    res.status(200).json({
        success: true,
        count: comments.length,
        comments,
    });
});
exports.deleteComment = (0, asyncHandler_1.default)(async (req, res) => {
    const id = req.params.id;
    await (0, comment_service_1.deleteCommentService)(id);
    res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
    });
});
exports.updateComment = (0, asyncHandler_1.default)(async (req, res) => {
    const id = req.params.id;
    const { content } = req.body;
    const comment = await (0, comment_service_1.updateCommentService)(id, content);
    res.status(200).json({
        success: true,
        message: "Comment updated successfully",
        comment,
    });
});
