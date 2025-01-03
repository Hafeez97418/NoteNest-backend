"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieOptions = exports.logout = exports.login = exports.register = void 0;
const catchAsyncError_1 = __importDefault(require("../utils/catchAsyncError"));
const redis_1 = __importDefault(require("../vendors/redis"));
const Users_1 = __importDefault(require("../models/Users"));
const utility_1 = require("../utils/utility");
const bcrypt_1 = __importDefault(require("bcrypt"));
const isProduction = process.env.MODE;
const cookieOptions = {
    httpOnly: true, // Prevents JavaScript access
    secure: isProduction === "production", // Use HTTPS in production, HTTP in development
    sameSite: "none", // "none" for cross-origin in prod
    maxAge: 3600000, // 1-hour expiration
};
exports.cookieOptions = cookieOptions;
const register = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //user body is validated in middleware
    const user = req.body.user;
    const otp = req.body.otp;
    const redis_otp = yield redis_1.default.get(`email:${user.email}:${user._id}`);
    if (otp !== redis_otp) {
        return res.status(400).json({ success: false, message: "incorrect OTP" });
    }
    user.password = yield (0, utility_1.HashPassword)(user.password);
    user.role = "user";
    yield new Users_1.default(user).save();
    const token = (0, utility_1.createToken)(user);
    res.cookie("authToken", token, cookieOptions);
    res.status(201).json({
        success: true,
        message: "your account has been registered successfully",
    });
}));
exports.register = register;
const login = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const userInDb = yield Users_1.default.findOne({
        email: user.email,
    });
    if (userInDb === null) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid credentials" });
    }
    const hashedPassword = userInDb.password;
    const isSamePassword = yield bcrypt_1.default.compare(user.password, hashedPassword);
    if (!isSamePassword) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid credentials" });
    }
    const token = (0, utility_1.createToken)(userInDb);
    res.cookie("authToken", token, cookieOptions);
    res
        .status(200)
        .json({ success: true, message: "you have logged in successfully" });
}));
exports.login = login;
const logout = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const logoutOptions = Object.assign({}, cookieOptions);
    logoutOptions.maxAge = 0;
    logoutOptions.expires = new Date(0);
    res.cookie("authToken", "deleted", logoutOptions);
    res.status(200).json({ success: true, message: "Logged out successfully" });
}));
exports.logout = logout;
