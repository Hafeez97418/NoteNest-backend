import { NextFunction, Request, Response } from "express";
const ErrorMiddleWare = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof Error)
    switch (error.name) {
      case "ValidationError":
        res.status(400).json({ success: false, message: error.message });
        break;
      case "CastError":
        res.status(400).json({ success: false, message: "Invalid object id" });
        break;
      case "MongoServerError":
        res.status(400).json({ success: false, message: error.message });
        break;
      default:
        console.error(error.name);
        res.status(500).json({ success: false, message: error.message });
        break;
    }
};

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
export { ErrorMiddleWare, CustomError };
