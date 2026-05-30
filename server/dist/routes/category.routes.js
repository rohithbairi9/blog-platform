"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const admin_middleware_1 = __importDefault(require("../middlewares/admin.middleware"));
const category_controller_1 = require("../controllers/category.controller");
const router = (0, express_1.Router)();
router.get("/", category_controller_1.getCategories);
router.post("/", auth_middleware_1.default, admin_middleware_1.default, category_controller_1.createCategory);
router.put("/:id", auth_middleware_1.default, admin_middleware_1.default, category_controller_1.updateCategory);
router.delete("/:id", auth_middleware_1.default, admin_middleware_1.default, category_controller_1.deleteCategory);
exports.default = router;
