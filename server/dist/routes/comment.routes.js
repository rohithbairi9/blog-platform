"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.get("/post/:postId", comment_controller_1.getCommentsByPost);
router.post("/", auth_middleware_1.default, comment_controller_1.createComment);
router.put("/:id", auth_middleware_1.default, comment_controller_1.updateComment);
router.delete("/:id", auth_middleware_1.default, comment_controller_1.deleteComment);
exports.default = router;
