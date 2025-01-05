import { NextFunction, Request, Response } from "express";
import Users from "../models/Users";
import catchAsyncError from "../utils/catchAsyncError";
import { TypeUser } from "../types";

const createAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;
    const user: TypeUser | null = await Users.findByIdAndUpdate(userId, {
      $set: { role: "admin",updatedAt:Date.now() },
    });
    if (user === null)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    res.status(201).json({
      success: true,
      message: `${user.firstName} ${user.lastName} was promoted to admin by you`,
    });
  }
);

const getAllAdmins = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const adminUsers: TypeUser[] = await Users.find({ role: "admin" });
    res.status(200).json({ success: true, admins: adminUsers });
  }
);

const demoteAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const adminUserId = req.params.id;
    const AdminUsers: number = await Users.countDocuments({ role: "admin" });
    if (AdminUsers <= 1) {
      return res.status(400).json({
        success: false,
        message:
          "The last admin cannot be deleted. Please transfer your admin role to another user before demoting.",
      });
    }
    const user: TypeUser | null = await Users.findByIdAndUpdate(adminUserId, {
      $set: { role: "user", updatedAt: Date.now() },
    });
    if (user === null)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    const { firstName, lastName } = user;
    res.status(200).json({
      success: true,
      message: `${firstName} ${lastName} was demoted to user`,
    });
  }
);
export { createAdmin, getAllAdmins, demoteAdmin };
