import api from "@/lib/axios";

export const getPostsByCategory = async (
  category: string
) => {
  const response = await api.get(
    `/posts?category=${category}`
  );

  return response.data;
};