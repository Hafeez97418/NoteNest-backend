import { Router } from "express";
import { login, logout, register } from "../controllers/auth";
import { registerValidation } from "./userBodyValidation";
import { body } from "express-validator";
import { isLoggedIn, validationPass } from "../middleware/ValidateRequests";
const authRouter = Router();

authRouter.post("/user/register", registerValidation, validationPass, register);
authRouter.post(
  "/user/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password").notEmpty().withMessage("your password is empty"),
  ],
  validationPass,
  login
);
authRouter.post("/user/logout", isLoggedIn, logout);
export default authRouter;
