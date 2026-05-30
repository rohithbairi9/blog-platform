import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title cannot exceed 150 characters"),

  content: z
    .string()
    .min(10, "Content must be at least 10 characters"),

  coverImage: z.string().optional(),

  published: z.boolean().optional(),

  category: z.string().optional(),

  tags: z.array(z.string()).optional(),
});

export const updatePostSchema =
  createPostSchema.partial();