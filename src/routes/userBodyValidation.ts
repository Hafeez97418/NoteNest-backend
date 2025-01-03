import { body } from "express-validator";
 const bodyValidation = [
    body("email").isEmail().withMessage("Invalid email").trim().notEmpty(),
    body("firstName")
        .isLength({ min: 1, max: 50 })
        .withMessage("first name must be minimum 1 and maximum 50 characters long"),
    body("lastName")
        .isLength({ max: 64 })
        .withMessage("last name's length must be less than 65 characters"),
    body("password")
        .isLength({ min: 6, max: 64 })
        .withMessage(
            "password's length must be minimum of 6 and maximum of 64 characters"
        ),
]; const registerValidation = [
  body("user.email").isEmail().withMessage("Invalid email").trim().notEmpty(),
  body("user.firstName")
    .isLength({ min: 1, max: 50 })
    .withMessage("first name must be minimum 1 and maximum 50 characters long"),
  body("user.lastName")
    .isLength({ max: 64 })
    .withMessage("last name's length must be less than 65 characters"),
  body("user.password")
    .isLength({ min: 6, max: 64 })
    .withMessage(
      "password's length must be minimum of 6 and maximum of 64 characters"
    ),
  body("user._id").notEmpty(),
  body("otp").notEmpty(),
];

export {bodyValidation,registerValidation}