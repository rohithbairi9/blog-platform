import api from "@/lib/axios";

export const toggleBookmark =
  async (postId: string) => {
    const response =
      await api.post(
        `/bookmarks/${postId}`
      );

    return response.data;
  };

export const getBookmarks =
  async () => {
    const response =
      await api.get(
        "/bookmarks"
      );

    return response.data;
  };