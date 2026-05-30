"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const adminMiddleware = async (req, _res, next) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: req.userId,
        },
    });
    if (!user) {
        return next(new AppError_1.default("User not found", 404));
    }
    if (user.role !== "ADMIN") {
        return next(new AppError_1.default("Access denied. Admin only", 403));
    }
    next();
};
exports.default = adminMiddleware;
