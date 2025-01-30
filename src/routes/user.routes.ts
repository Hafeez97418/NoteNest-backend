import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUserName,
} from "../controllers/users";
import { sendVerification } from "../middleware/verifyUsers";
import { bodyValidation } from "./userBodyValidation";
import {
  isAdmin,
  isLoggedIn,
  validationPass,
} from "../middleware/ValidateRequests";
import { body } from "express-validator";

const UsersRouter: Router = Router();

//routes
UsersRouter.post(
  "/user/verify",
  bodyValidation,
  validationPass,
  createUser,
  sendVerification
).get("/users/all", isLoggedIn, isAdmin, getAllUsers);
//same route segments
UsersRouter.route("/user")
  .get(isLoggedIn, getUser)
  .put(
    isLoggedIn,
    [
      body("firstName")
        .isLength({ min: 1, max: 50 })
        .withMessage(
          "first name must be minimum 1 and maximum 50 characters long"
        ),
      body("lastName")
        .isLength({ max: 64 })
        .withMessage("last name's length must be less than 65 characters"),
    ],
    validationPass,
    updateUserName
  );
UsersRouter.route("/user/:id").delete(isLoggedIn, isAdmin , deleteUser);
export default UsersRouter;
