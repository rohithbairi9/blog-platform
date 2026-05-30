"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentSchema = void 0;
const zod_1 = require("zod");
exports.createCommentSchema = zod_1.z.object({
    content: zod_1.z
        .string()
        .min(2, "Comment must be at least 2 characters")
        .max(1000, "Comment cannot exceed 1000 characters"),
    postId: zod_1.z
        .string()
        .min(1, "Post ID is required"),
});
