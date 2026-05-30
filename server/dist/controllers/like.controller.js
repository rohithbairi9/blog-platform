"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLikesCount = exports.toggleLike = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const like_service_1 = require("../services/like.service");
exports.toggleLike = (0, asyncHandler_1.default)(async (req, res) => {
    const postId = req.params.postId;
    const result = await (0, like_service_1.toggleLikeService)(postId, req.userId);
    res.status(200).json({
        success: true,
        ...result,
    });
});
exports.getLikesCount = (0, asyncHandler_1.default)(async (req, res) => {
    const postId = req.params.postId;
    const likesCount = await (0, like_service_1.getLikesCountService)(postId);
    res.status(200).json({
        success: true,
        likesCount,
    });
});
