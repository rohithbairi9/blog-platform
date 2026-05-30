// src/services/user.service.ts

import prisma from "../config/prisma";
import AppError from "../utils/AppError";

export const getProfileService = async (
  userId: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const updateProfileService = async (
  userId: string,
  data: {
    name?: string;
    avatar?: string;
  }
) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },

    data,

    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};