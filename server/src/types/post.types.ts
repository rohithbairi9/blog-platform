import { z } from "zod";

import {
  createPostSchema,
  updatePostSchema,
} from "../validators/post.validator";

export type CreatePostInput =
  z.infer<typeof createPostSchema>;

export type UpdatePostInput =
  z.infer<typeof updatePostSchema>;

export interface PostQuery {
  page?: string;
  limit?: string;
  search?: string;

  category?: string;
  tag?: string;
}