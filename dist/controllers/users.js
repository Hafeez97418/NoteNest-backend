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
exports.deleteUser = exports.updateUserName = exports.getAllUsers = exports.getUser = exports.createUser = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const catchAsyncError_1 = __importDefault(require("../utils/catchAsyncError"));
const auth_1 = require("./auth");
/**
 *  create user before register than send for verification
 *  request type POST
 */
const createUser = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const userInDB = yield Users_1.default.find({ email: userData.email });
    if (userInDB.length > 0) {
        const Err = new Error();
        Err.name = "MongoServerError";
        Err.message = "E11000 duplicate key error collection";
        throw Err;
    }
    userData.role = "user";
    const user = new Users_1.default(userData);
    req.user = user;
    next();
}));
exports.createUser = createUser;
/**
 *  get a user by its id
 *  request type GET
 *  isLoggedIn: true
 */
const getUser = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    if (!userId) {
        throw new Error("user id is undefined");
    }
    const user = yield Users_1.default.findById(userId);
    user === null
        ? res.status(404).json({ success: false, message: "user not found" })
        : res.status(200).json({ success: true, user });
}));
exports.getUser = getUser;
/**
 * gets all users
 * request type GET
 * isAdmin : true
 */
const getAllUsers = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Users_1.default.find();
    return res.status(200).json({ success: true, users });
}));
exports.getAllUsers = getAllUsers;
/**
 * updates users first_name , last_name , password
 * request type PUT
 * isLoggedIn : true
 * validationPass :true
 */
const updateUserName = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const { firstName, lastName } = req.body;
    const updated = yield Users_1.default.findByIdAndUpdate(userId, {
        $set: { firstName, lastName },
    });
    if (updated === null) {
        throw new Error("oops something went wrong please try again later");
    }
    res.status(200).json({ success: true, message: "user updated successfully" });
}));
exports.updateUserName = updateUserName;
/**
 *  deletes the user. used for deactivating account
 * isLoggedIn : true
 * */
const deleteUser = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const updated = yield Users_1.default.findByIdAndDelete(userId);
    if (updated === null) {
        throw new Error("oops something went wrong please try again later");
    }
    const deleteCookieOptions = Object.assign({}, auth_1.cookieOptions);
    deleteCookieOptions.maxAge = 0;
    deleteCookieOptions.expires = new Date(0);
    res.cookie("authToken", "deleted", deleteCookieOptions);
    res
        .status(200)
        .json({ success: true, message: "user deleted successfully" });
}));
exports.deleteUser = deleteUser;
