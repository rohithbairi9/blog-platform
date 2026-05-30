"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
};
exports.default = generateSlug;
