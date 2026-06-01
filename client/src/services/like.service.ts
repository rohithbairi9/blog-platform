import api from "@/lib/axios";

export const getLikesCount =
  async (postId: string) => {
    const response =
      await api.get(
        `/likes/${postId}`
      );

    return response.data;
  };

export const toggleLike =
  async (postId: string) => {
    const response =
      await api.post(
        `/likes/${postId}`
      );

    return response.data;
  };