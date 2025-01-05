import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../utils/catchAsyncError";
import Notes from "../models/Notes";
import { RequestWithUserId } from "../types";

const createNotes = catchAsyncError(
  async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    const notes = req.body;
    const userId = req.user;
    notes.userId = userId;
    const newNotes = await Notes.create(notes);
    res.status(200).json({
      success: true,
      message: "your notes was successfully created",
      notes: newNotes,
    });
  }
);

const getAllNotes = catchAsyncError(
  async (req: RequestWithUserId, res: Response, next: NextFunction) => {
    const userId = req.user;
    const notes = await Notes.find({ userId });
    res.status(200).json({ success: true, notes });
  }
);

const updateNotes = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const newNotes = req.body;
    newNotes.updatedAt = Date.now();
    const updatedNotes = await Notes.findByIdAndUpdate(id, {
      $set: newNotes,
    });
    if (updatedNotes === null) {
      return res
        .status(404)
        .json({ success: false, message: "notes not found" });
    }
    return res.status(200).json({ success: true, message: "notes updated" });
  }
);

const deleteNotes = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const deletedNotes = await Notes.findByIdAndDelete(id);
    if (deletedNotes === null) {
      return res
        .status(404)
        .json({ success: false, message: "notes not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "notes deleted", deletedNotes });
  }
);

export { createNotes, getAllNotes, updateNotes, deleteNotes };
