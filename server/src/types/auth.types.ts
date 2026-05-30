import { Request } from "express";
import { z } from "zod";
import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator";

export type RegisterInput =
  z.infer<typeof registerSchema>;

export type LoginInput =
  z.infer<typeof loginSchema>;

export interface AuthRequest extends Request {
  userId?: string;
}