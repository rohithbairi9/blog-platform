"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const like_controller_1 = require("../controllers/like.controller");
const router = (0, express_1.Router)();
router.post("/:postId", auth_middleware_1.default, like_controller_1.toggleLike);
router.get("/:postId", like_controller_1.getLikesCount);
exports.default = router;
