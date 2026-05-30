"use strict";
// src/routes/user.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const user_controller_1 = require("../controllers/user.controller");
const user_controller_2 = require("../controllers/user.controller");
const admin_middleware_1 = __importDefault(require("../middlewares/admin.middleware"));
const router = (0, express_1.Router)();
router.get("/profile", auth_middleware_1.default, user_controller_2.getProfile);
router.put("/profile", auth_middleware_1.default, user_controller_2.updateProfile);
router.put("/make-admin/:userId", auth_middleware_1.default, admin_middleware_1.default, user_controller_1.makeAdmin);
exports.default = router;
