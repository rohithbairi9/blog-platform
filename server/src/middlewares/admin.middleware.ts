import { Response, NextFunction } from "express";
import prisma from "../config/prisma";
import AppError from "../utils/AppError";
import { AuthRequest } from "../types/auth.types";

const adminMiddleware = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
  });

  if (!user) {
    return next(
      new AppError("User not found", 404)
    );
  }

  if (user.role !== "ADMIN") {
    return next(
      new AppError(
        "Access denied. Admin only",
        403
      )
    );
  }

  next();
};

export default adminMiddleware;