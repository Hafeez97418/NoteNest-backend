import { Router } from "express";
import {
  isAdmin,
  isLoggedIn,
  validationPass,
} from "../middleware/ValidateRequests";
import { createTheme, deleteTheme, getAllThemes } from "../controllers/theme";
import { body } from "express-validator";

const themeRouter = Router();

themeRouter
  .route("/theme")
  .get(isLoggedIn, getAllThemes)
  .post(
    isLoggedIn,
    isAdmin,
    [
      body("color").notEmpty().withMessage("color is required for a theme"),
      body("name").notEmpty().withMessage("name is required for a theme"),
    ],
    validationPass,
    createTheme
  );

themeRouter.delete("/theme/:id", deleteTheme);

export default themeRouter;