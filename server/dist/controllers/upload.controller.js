"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
exports.uploadImage = (0, asyncHandler_1.default)(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded",
        });
    }
    const result = await new Promise((resolve, reject) => {
        cloudinary_1.default.uploader
            .upload_stream({
            folder: "blog-platform",
        }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        })
            .end(req.file.buffer);
    });
    res.status(200).json({
        success: true,
        imageUrl: result.secure_url,
    });
});
