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
exports.sendVerification = void 0;
const catchAsyncError_1 = __importDefault(require("../utils/catchAsyncError"));
const redis_1 = __importDefault(require("../vendors/redis"));
const nodemailer_1 = __importDefault(require("../vendors/nodemailer"));
const ExpireTime = 600;
const generateOtp = () => Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
const sendVerification = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new Error("user object is not defined");
    }
    const otp = generateOtp();
    const redisKey = `email:${user.email}:${user._id}`;
    redis_1.default.set(redisKey, otp, { EX: ExpireTime });
    const mailOptions = {
        from: process.env.SERVER_EMAIL,
        to: user.email,
        subject: "Your OTP for Secure Login - NoteNest",
        html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #007bff;">NoteNest OTP</h1>
      <p>Dear User,</p>
      <p>Your One-Time Password (OTP) for secure access is:</p>
      <p style="font-size: 24px; font-weight: bold; color: #007bff;">${otp}</p>
      <p>Please use this OTP within 10 minutes. Do not share it with anyone.</p>
      <hr>
      <footer>
        <p style="font-size: 12px; color: #666;">If you did not request this OTP, please ignore this email.</p>
        <p style="font-size: 12px; color: #666;">© 2024 NoteNest, All rights reserved.</p>
      </footer>
    </div>`,
    };
    yield nodemailer_1.default.sendMail(mailOptions);
    res.status(200).json({
        success: true,
        message: `an OTP is sended to your email which will expire in ${ExpireTime / 60} minutes`,
        user,
    });
}));
exports.sendVerification = sendVerification;
