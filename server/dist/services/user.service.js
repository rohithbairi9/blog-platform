"use strict";
// src/services/user.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileService = exports.getProfileService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const getProfileService = async (userId) => {
    const user = await prisma_1.default.user.findUnique({
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
        throw new AppError_1.default("User not found", 404);
    }
    return user;
};
exports.getProfileService = getProfileService;
const updateProfileService = async (userId, data) => {
    const user = await prisma_1.default.user.update({
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
exports.updateProfileService = updateProfileService;
