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
exports.isLoggedIn = exports.validationPass = void 0;
const express_validator_1 = require("express-validator");
const fs_1 = require("fs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsyncError_1 = __importDefault(require("../utils/catchAsyncError"));
const validationPass = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        res.status(400).json({ success: false, message: result.array()[0].msg });
        return;
    }
    next();
};
exports.validationPass = validationPass;
//custom Request with user
exports.isLoggedIn = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies;
    const token = cookie.authToken;
    if (!token || token === "deleted") {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized. Please log in." });
    }
    const secret = (0, fs_1.readFileSync)("public.key", "utf8");
    const decoded = jsonwebtoken_1.default.verify(token, secret);
    req.user = decoded.user;
    next();
}));
