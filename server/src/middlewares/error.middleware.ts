import {
  Request,
  Response,
  NextFunction,
} from "express";

import AppError from "../utils/AppError";

const errorMiddleware = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode =
    err instanceof AppError
      ? err.statusCode
      : 500;

  res.status(statusCode).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
};

export default errorMiddleware;