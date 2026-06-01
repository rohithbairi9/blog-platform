import api from "@/lib/axios";

export const getAdminStats =
  async () => {
    const response =
      await api.get("/admin/stats");

    return response.data;
  };

export const getAllUsers =
  async () => {
    const response =
      await api.get("/admin/users");

    return response.data;
  };

export const makeAdmin =
  async (userId: string) => {
    const response =
      await api.put(
        `/users/make-admin/${userId}`
      );

    return response.data;
  };

export const deleteUser =
  async (userId: string) => {
    const response =
      await api.delete(
        `/admin/users/${userId}`
      );

    return response.data;
  };

export const getAllPosts =
  async () => {
    const response =
      await api.get(
        "/admin/posts"
      );

    return response.data;
  };

export const deletePost =
  async (postId: string) => {
    const response =
      await api.delete(
        `/admin/posts/${postId}`
      );

    return response.data;
  };

export const togglePublishPost =
  async (postId: string) => {

    const response =
      await api.patch(
        `/admin/posts/${postId}/toggle-publish`
      );

    return response.data;
  };

export const getRecentActivity =
  async () => {

    const response =
      await api.get(
        "/admin/recent-activity"
      );

    return response.data;
  };