"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const errorMiddleware = (err, _req, res, _next) => {
    const statusCode = err instanceof AppError_1.default
        ? err.statusCode
        : 500;
    res.status(statusCode).json({
        success: false,
        message: err.message ||
            "Internal Server Error",
    });
};
exports.default = errorMiddleware;
