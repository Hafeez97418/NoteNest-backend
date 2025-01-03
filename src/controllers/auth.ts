import { CookieOptions, NextFunction, Request, Response } from "express";
import catchAsyncError from "../utils/catchAsyncError";
import client from "../vendors/redis";
import Users from "../models/Users";
import { TypeUser } from "../types";
import { createToken, HashPassword } from "../utils/utility";
import bcrypt from "bcrypt";

const isProduction: string | undefined = process.env.MODE;

const cookieOptions: CookieOptions = {
  httpOnly: true, // Prevents JavaScript access
  secure: isProduction === "production", // Use HTTPS in production, HTTP in development
  sameSite: "none", // "none" for cross-origin in prod
  maxAge: 3600000, // 1-hour expiration
};

const register = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    //user body is validated in middleware
    const user: TypeUser = req.body.user;
    const otp = req.body.otp;
    const redis_otp = await client.get(`email:${user.email}:${user._id}`);

    if (otp !== redis_otp) {
      return res.status(400).json({ success: false, message: "incorrect OTP" });
    }
    user.password = await HashPassword(user.password);
    user.role = "user";
    await new Users(user).save();
    const token = createToken(user);
    res.cookie("authToken", token, cookieOptions);
    res.status(201).json({
      success: true,
      message: "your account has been registered successfully",
    });
  }
);

const login = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: { email: string; password: string } = req.body;
    const userInDb: TypeUser | null = await Users.findOne({
      email: user.email,
    });
    if (userInDb === null) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const hashedPassword = userInDb.password;
    const isSamePassword = await bcrypt.compare(user.password, hashedPassword);

    if (!isSamePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(userInDb);    
    res.cookie("authToken", token, cookieOptions);
    res
      .status(200)
      .json({ success: true, message: "you have logged in successfully" });
  }
);

const logout = catchAsyncError(async (req: Request, res: Response) => {
  const logoutOptions = { ...cookieOptions };
  logoutOptions.maxAge = 0;
  logoutOptions.expires = new Date(0);
  res.cookie("authToken", "deleted", logoutOptions);
  res.status(200).json({ success: true, message: "Logged out successfully" });
});


export { register, login, logout, cookieOptions };