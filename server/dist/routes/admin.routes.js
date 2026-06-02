"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const admin_middleware_1 = __importDefault(require("../middlewares/admin.middleware"));
const admin_controller_1 = require("../controllers/admin.controller");
const router = (0, express_1.Router)();
router.get("/stats", auth_middleware_1.default, admin_middleware_1.default, admin_controller_1.getAdminStats);
router.get("/users", auth_middleware_1.default, admin_middleware_1.default, admin_controller_1.getAllUsers);
router.delete("/users/:userId", auth_middleware_1.default, admin_middleware_1.default, admin_controller_1.deleteUser);
router.get("/posts", auth_middleware_1.default, admin_middleware_1.default, admin_controller_1.getAllPosts);
router.delete("/posts/:postId", auth_middleware_1.default, admin_middleware_1.default, admin_controller_1.deletePost);
router.patch("/posts/:postId/toggle-publish", auth_middleware_1.default, admin_middleware_1.default, admin_controller_1.togglePublishPost);
router.get("/recent-activity", auth_middleware_1.default, admin_middleware_1.default, admin_controller_1.getRecentActivity);
exports.default = router;
