import api from "@/lib/axios";

export const getProfile =
  async () => {
    const response =
      await api.get(
        "/users/profile"
      );

    return response.data;
  };

export const updateProfile =
  async (data: {
    name?: string;
    avatar?: string;
  }) => {
    const response =
      await api.put(
        "/users/profile",
        data
      );

    return response.data;
  };