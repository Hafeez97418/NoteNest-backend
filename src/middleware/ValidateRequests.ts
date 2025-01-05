import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import catchAsyncError from "../utils/catchAsyncError";
import { RequestWithUserId } from "../types";
import Users from "../models/Users";

export const validationPass = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ success: false, message: result.array()[0].msg });
    return;
  }
  next();
};

export const isLoggedIn = catchAsyncError(
  async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    const cookie = req.cookies;
    const token: string | undefined = cookie.authToken;
    if (!token || token === "deleted") {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized. Please log in." });
    }
    const secret = readFileSync("public.key", "utf8");
    const decoded = jwt.verify(token, secret) as { user: string };
    req.user = decoded.user;
    next();
  }
);
export const isAdmin = catchAsyncError(
  async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    const userId = req.user; //it has user because we are have used isLoggedIn middleware before this
    const isAdminVar: boolean = await Users.findById(userId).then((result) => {
      if (result === null) return false;
      if (result.role === undefined) return false;
      return result.role === "admin";
    });
    if (!isAdminVar) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    next();
  }
);
