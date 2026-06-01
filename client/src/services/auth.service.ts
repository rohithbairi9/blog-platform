// import api from "../lib/axios";

// import {
//   RegisterData,
//   LoginData,
// } from "../types/auth.types";

// export const registerUser = async (
//   data: RegisterData
// ) => {
//   const response = await api.post(
//     "/auth/register",
//     data
//   );

//   return response.data;
// };

// export const loginUser = async (
//   data: LoginData
// ) => {
//   const response = await api.post(
//     "/auth/login",
//     data
//   );

//   return response.data;
// };

import api from "../lib/axios";
import {
  RegisterData,
  LoginData,
} from "../types/auth.types";

import { ProfileResponse } from "../types/auth.types";

export const registerUser = async (
  data: RegisterData
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};

export const loginUser = async (
  data: LoginData
) => {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};

export const getProfile =
  async (): Promise<ProfileResponse> => {
    const response = await api.get(
      "/users/profile"
    );

    return response.data;
  };

export const logoutUser =
  async () => {
    const response =
      await api.post(
        "/auth/logout"
      );

    return response.data;
  };