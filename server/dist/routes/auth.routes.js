"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.registerUser);
router.post("/login", auth_controller_1.loginUser);
router.post("/logout", auth_controller_1.logoutUser);
router.get("/verify/:token", auth_controller_1.verifyEmail);
router.post("/forgot-password", auth_controller_1.forgotPassword);
router.post("/reset-password/:token", auth_controller_1.resetPassword);
router.get("/me", auth_middleware_1.default, auth_controller_1.getMe);
exports.default = router;
