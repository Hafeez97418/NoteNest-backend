import { Router } from "express";
import { isLoggedIn, validationPass } from "../middleware/ValidateRequests";
import {
  createNotes,
  deleteNotes,
  getAllNotes,
  updateNotes,
} from "../controllers/notes";
import { body } from "express-validator";

const notesRouter = Router();

const notesValidationChain = [
  body("title")
    .isLength({ min: 1, max: 100 })
    .withMessage(
      "title must be at least 1 character long and must be less than 100 characters"
    ),
  body("body").notEmpty().withMessage("notes body is required"),
  body("color").notEmpty().withMessage("select theme color for the notes"),
];
notesRouter
  .route("/notes")
  .get(isLoggedIn, getAllNotes)
  .post(isLoggedIn, notesValidationChain, validationPass, createNotes);
notesRouter
  .route("/notes/:id")
  .put(isLoggedIn, notesValidationChain, validationPass, updateNotes)
  .delete(isLoggedIn, deleteNotes);

export default notesRouter;
