"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookmarks = exports.toggleBookmark = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const bookmark_service_1 = require("../services/bookmark.service");
exports.toggleBookmark = (0, asyncHandler_1.default)(async (req, res) => {
    const postId = req.params.postId;
    const result = await (0, bookmark_service_1.toggleBookmarkService)(postId, req.userId);
    res.status(200).json({
        success: true,
        ...result,
    });
});
exports.getBookmarks = (0, asyncHandler_1.default)(async (req, res) => {
    const bookmarks = await (0, bookmark_service_1.getBookmarksService)(req.userId);
    res.status(200).json({
        success: true,
        count: bookmarks.length,
        bookmarks,
    });
});
