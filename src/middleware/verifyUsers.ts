import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../utils/catchAsyncError";
import client from "../vendors/redis";
import transporter from "../vendors/nodemailer";
import { RequestWithUserObject, TypeUser } from "../types";

const ExpireTime = 600;
const generateOtp = () => Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

const sendVerification = catchAsyncError(
  async (req: RequestWithUserObject, res: Response, next: NextFunction) => {
    const user: TypeUser = req.user as TypeUser;
    if (!user) {
      throw new Error("user object is not defined");
    }
    const otp = generateOtp();
    const redisKey = `email:${user.email}:${user._id}`;
    client.set(redisKey, otp, { EX: ExpireTime });
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
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: `an OTP is sended to your email which will expire in ${
        ExpireTime / 60
      } minutes`,
      user,
    });
  }
);

export { sendVerification };
