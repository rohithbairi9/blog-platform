"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostSchema = exports.createPostSchema = void 0;
const zod_1 = require("zod");
exports.createPostSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(150, "Title cannot exceed 150 characters"),
    content: zod_1.z
        .string()
        .min(10, "Content must be at least 10 characters"),
    coverImage: zod_1.z.string().optional(),
    published: zod_1.z.boolean().optional(),
    category: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.updatePostSchema = exports.createPostSchema.partial();
