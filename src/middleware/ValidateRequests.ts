import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import catchAsyncError from "../utils/catchAsyncError";
import { RequestWithUserId } from "../types";

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

//custom Request with user

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
