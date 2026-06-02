"use strict";
// src/controllers/user.controller.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.makeAdmin = exports.updateProfile = exports.getProfile = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const user_service_1 = require("../services/user.service");
const prisma_1 = __importDefault(require("../config/prisma"));
exports.getProfile = (0, asyncHandler_1.default)(async (req, res) => {
    const user = await (0, user_service_1.getProfileService)(req.userId);
    res.status(200).json({
        success: true,
        user,
    });
});
exports.updateProfile = (0, asyncHandler_1.default)(async (req, res) => {
    const user = await (0, user_service_1.updateProfileService)(req.userId, req.body);
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user,
    });
});
exports.makeAdmin = (0, asyncHandler_1.default)(async (req, res) => {
    const { userId } = req.params;
    const user = await prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data: {
            role: "ADMIN",
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
    res.status(200).json({
        success: true,
        message: "User promoted to ADMIN",
        user,
    });
});
exports.getUserById = (0, asyncHandler_1.default)(async (req, res) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: String(req.params.id),
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
});
