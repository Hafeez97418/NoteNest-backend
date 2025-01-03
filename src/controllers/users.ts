import { NextFunction, Request, Response } from "express";
import Users from "../models/Users";
import { RequestWithUserId, RequestWithUserObject, TypeUser } from "../types";
import catchAsyncError from "../utils/catchAsyncError";
import { cookieOptions } from "./auth";

/**
 *  create user before register than send for verification
 *  request type POST
 */
const createUser = catchAsyncError(
  async (req: RequestWithUserObject, res: Response, next: NextFunction) => {
    const userData: TypeUser = req.body as unknown as TypeUser;
    const userInDB = await Users.find({ email: userData.email });
    if (userInDB.length > 0) {
      const Err = new Error();
      Err.name = "MongoServerError";
      Err.message = "E11000 duplicate key error collection";
      throw Err;
    }
    userData.role = "user";
    const user = new Users(userData);
    req.user = user;
    next();
  }
);

/**
 *  get a user by its id
 *  request type GET
 *  isLoggedIn: true
 */
const getUser = catchAsyncError(
  async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    const userId: string | undefined = req.user;
    if (!userId) {
      throw new Error("user id is undefined");
    }
    const user: TypeUser | null = await Users.findById(userId);
    user === null
      ? res.status(404).json({ success: false, message: "user not found" })
      : res.status(200).json({ success: true, user });
  }
);

/**
 * gets all users
 * request type GET
 * isAdmin : true
 */
const getAllUsers = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const users: TypeUser[] = await Users.find();
    return res.status(200).json({ success: true, users });
  }
);

/**
 * updates users first_name , last_name , password
 * request type PUT
 * isLoggedIn : true
 * validationPass :true
 */
const updateUserName = catchAsyncError(
  async (req: RequestWithUserId, res: Response) => {
    const userId = req.user;
    const { firstName, lastName } = req.body;
    const updated = await Users.findByIdAndUpdate(userId, {
      $set: { firstName, lastName },
    });
    if (updated === null) {
      throw new Error("oops something went wrong please try again later");
    }
    res.status(200).json({ success: true, message: "user updated successfully" });
  }
);

/**
 *  deletes the user. used for deactivating account
 * isLoggedIn : true 
 * */
const deleteUser = catchAsyncError(
  async (req: RequestWithUserId, res: Response) => {
    const userId = req.user;
    const updated = await Users.findByIdAndDelete(userId);
    if (updated === null) {
      throw new Error("oops something went wrong please try again later");
    }
    const deleteCookieOptions = { ...cookieOptions };
    deleteCookieOptions.maxAge = 0;
    deleteCookieOptions.expires = new Date(0);
    res.cookie("authToken", "deleted", deleteCookieOptions);
    res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  }
);
export { createUser, getUser, getAllUsers, updateUserName, deleteUser };
