"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.ErrorMiddleWare = void 0;
const ErrorMiddleWare = (error, req, res, next) => {
    if (error instanceof Error)
        switch (error.name) {
            case "ValidationError":
                res.status(400).json({ success: false, message: error.message });
                break;
            case "CastError":
                res.status(400).json({ success: false, message: "Invalid user" });
                break;
            case "MongoServerError":
                if (error.message.includes("E11000 duplicate key error collection"))
                    res.status(400).json({
                        success: false,
                        message: "a user with this email already exists",
                    });
                else
                    res.status(500).json({ success: false, message: error.message });
                break;
            default:
                console.error(error.name);
                res.status(500).json({ success: false, message: error.message });
                break;
        }
};
exports.ErrorMiddleWare = ErrorMiddleWare;
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
