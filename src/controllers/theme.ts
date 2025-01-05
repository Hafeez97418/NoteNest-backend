import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../utils/catchAsyncError";
import Theme from "../models/Theme";
import { TypeTheme } from "../types";

const createTheme = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const newTheme: TypeTheme = req.body;
    await new Theme(newTheme).save();
    res.status(200).json({ success: true, message: "new theme added" });
  }
);

const getAllThemes = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const themes: TypeTheme[] = await Theme.find();
    res.status(200).json({ success: true, themes });
  }
);

const deleteTheme = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const theme: TypeTheme | null = await Theme.findByIdAndDelete(id);
    if (theme === null) {
      return res
        .status(404)
        .json({ success: false, message: "theme not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "theme successfully deleted" });
  }
);

export { createTheme, getAllThemes, deleteTheme };