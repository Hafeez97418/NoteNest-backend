import { NextFunction, Request, Response } from "express";

const catchAsyncError =
  (func: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
export default catchAsyncError;
