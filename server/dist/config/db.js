"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./prisma"));
const connectDB = async () => {
    try {
        await prisma_1.default.$connect();
        console.log("MongoDB Connected Through Prisma");
    }
    catch (error) {
        console.error("Database Connection Failed", error);
        process.exit(1);
    }
};
exports.default = connectDB;
