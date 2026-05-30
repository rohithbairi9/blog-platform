"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
const like_routes_1 = __importDefault(require("./routes/like.routes"));
const bookmark_routes_1 = __importDefault(require("./routes/bookmark.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/posts", post_routes_1.default);
app.use("/api/comments", comment_routes_1.default);
app.use("/api/likes", like_routes_1.default);
app.use("/api/bookmarks", bookmark_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/upload", upload_routes_1.default);
app.use(error_middleware_1.default);
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Blog API Running",
    });
});
const PORT = process.env.PORT || 5000;
(0, db_1.default)();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
