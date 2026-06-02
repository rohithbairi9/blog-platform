"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.verifyEmail = exports.getMe = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../config/prisma"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const auth_validator_1 = require("../validators/auth.validator");
const uuid_1 = require("uuid");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const crypto_1 = __importDefault(require("crypto"));
const registerUser = async (req, res) => {
    try {
        const validatedData = auth_validator_1.registerSchema.parse(req.body);
        const { name, email, password } = validatedData;
        const existingUser = await prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const verificationToken = (0, uuid_1.v4)();
        const user = await prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                verified: false,
                verificationToken,
            },
        });
        const verificationUrl = `http://localhost:5000/api/auth/verify/${verificationToken}`;
        await (0, sendEmail_1.default)(email, "Verify Your Account", `
    <h2>Welcome to Blog Platform</h2>

    <p>Click the link below to verify your account:</p>

    <a href="${verificationUrl}">
      Verify Account
    </a>
  `);
        const token = (0, generateToken_1.default)(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const validatedData = auth_validator_1.loginSchema.parse(req.body);
        const { email, password } = validatedData;
        const user = await prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        if (!user.verified) {
            return res.status(401).json({
                success: false,
                message: "Please verify your email first",
            });
        }
        const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const token = (0, generateToken_1.default)(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.loginUser = loginUser;
const logoutUser = async (_req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
};
exports.logoutUser = logoutUser;
const getMe = async (req, res) => {
    try {
        const user = await prisma_1.default.user.findUnique({
            where: {
                id: req.userId,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getMe = getMe;
const verifyEmail = async (req, res) => {
    const token = req.params.token;
    const user = await prisma_1.default.user.findFirst({
        where: {
            verificationToken: token,
        },
    });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid token",
        });
    }
    await prisma_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            verified: true,
            verificationToken: null,
        },
    });
    return res.json({
        success: true,
        message: "Email verified successfully",
    });
};
exports.verifyEmail = verifyEmail;
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    const resetPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await prisma_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            resetPasswordToken: resetToken,
            resetPasswordExpiry,
        },
    });
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    await (0, sendEmail_1.default)(user.email, "Reset Your Password", `
      <h2>Password Reset</h2>

      <p>
        Click the link below to reset your password:
      </p>

      <a href="${resetUrl}">
        Reset Password
      </a>
    `);
    return res.json({
        success: true,
        message: "Password reset email sent",
    });
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    const token = req.params.token;
    const { password } = req.body;
    const user = await prisma_1.default.user.findFirst({
        where: {
            resetPasswordToken: token,
            resetPasswordExpiry: {
                gt: new Date(),
            },
        },
    });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    await prisma_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpiry: null,
        },
    });
    return res.json({
        success: true,
        message: "Password reset successfully",
    });
};
exports.resetPassword = resetPassword;
