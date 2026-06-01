import api from "../lib/axios";
import {
  PostsResponse,
  SinglePostResponse,
} from "../types/post.types";
import { CreatePostData } from "../types/post.types";
import { UpdatePostData } from "../types/post.types";

export const getAllPosts =
  async (
    search?: string,
    page: number = 1
  ): Promise<PostsResponse> => {
    const response =
  await api.get("/posts", {
    params: {
      search,
      page,
      limit: 5,
    },
  });

    return response.data;
  };

export const getPostBySlug =
  async (
    slug: string
  ): Promise<SinglePostResponse> => {
    const response = await api.get(
      `/posts/${slug}`
    );

    return response.data;
  };

export const createPost =
  async (data: CreatePostData) => {
    const response =
      await api.post(
        "/posts",
        data
      );

    return response.data;
  };

export const updatePost =
  async (
    id: string,
    data: UpdatePostData
  ) => {
    const response =
      await api.put(
        `/posts/${id}`,
        data
      );

    return response.data;
  };

export const getPostById =
  async (id: string) => {
    const response =
      await api.get(
        `/posts/id/${id}`
      );

    return response.data;
  };

export const deletePost =
  async (id: string) => {
    const response =
      await api.delete(
        `/posts/${id}`
      );

    return response.data;
  };

export const getMyPosts =
  async () => {
    const response =
      await api.get(
        "/posts/my-posts"
      );

    return response.data;
  };