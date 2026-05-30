"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategories = exports.createCategory = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const category_service_1 = require("../services/category.service");
exports.createCategory = (0, asyncHandler_1.default)(async (req, res) => {
    const category = await (0, category_service_1.createCategoryService)(req.body.name);
    res.status(201).json({
        success: true,
        category,
    });
});
exports.getCategories = (0, asyncHandler_1.default)(async (_req, res) => {
    const categories = await (0, category_service_1.getCategoriesService)();
    res.status(200).json({
        success: true,
        count: categories.length,
        categories,
    });
});
exports.updateCategory = (0, asyncHandler_1.default)(async (req, res) => {
    const category = await (0, category_service_1.updateCategoryService)(req.params.id, req.body.name);
    res.status(200).json({
        success: true,
        category,
    });
});
exports.deleteCategory = (0, asyncHandler_1.default)(async (req, res) => {
    await (0, category_service_1.deleteCategoryService)(req.params.id);
    res.status(200).json({
        success: true,
        message: "Category deleted successfully",
    });
});
