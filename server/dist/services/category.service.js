"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.getCategoriesService = exports.createCategoryService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createCategoryService = async (name) => {
    return prisma_1.default.category.create({
        data: {
            name,
        },
    });
};
exports.createCategoryService = createCategoryService;
const getCategoriesService = async () => {
    return prisma_1.default.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
};
exports.getCategoriesService = getCategoriesService;
const updateCategoryService = async (id, name) => {
    return prisma_1.default.category.update({
        where: { id },
        data: { name },
    });
};
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = async (id) => {
    return prisma_1.default.category.delete({
        where: { id },
    });
};
exports.deleteCategoryService = deleteCategoryService;
