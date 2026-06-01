import api from "../lib/axios";

import { CommentsResponse } from "../types/post.types";

export const getCommentsByPost =
  async (
    postId: string
  ): Promise<CommentsResponse> => {
    const response =
      await api.get(
        `/posts/${postId}/comments`
      );

    return response.data;
  };

export const createComment =
  async (
    content: string,
    postId: string
  ) => {
    const response =
      await api.post(
        "/comments",
        {
          content,
          postId,
        }
      );

    return response.data;
  };

export const deleteComment =
  async (id: string) => {
    const response =
      await api.delete(
        `/comments/${id}`
      );

    return response.data;
  };