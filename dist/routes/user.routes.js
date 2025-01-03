"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const verifyUsers_1 = require("../middleware/verifyUsers");
const userBodyValidation_1 = require("./userBodyValidation");
const ValidateRequests_1 = require("../middleware/ValidateRequests");
const express_validator_1 = require("express-validator");
const UsersRouter = (0, express_1.Router)();
//routes
UsersRouter.post("/user/verify", userBodyValidation_1.bodyValidation, ValidateRequests_1.validationPass, users_1.createUser, verifyUsers_1.sendVerification).get("/users/all", users_1.getAllUsers);
//same route segments
UsersRouter.route("/user")
    .get(ValidateRequests_1.isLoggedIn, users_1.getUser)
    .put(ValidateRequests_1.isLoggedIn, [
    (0, express_validator_1.body)("firstName")
        .isLength({ min: 1, max: 50 })
        .withMessage("first name must be minimum 1 and maximum 50 characters long"),
    (0, express_validator_1.body)("lastName")
        .isLength({ max: 64 })
        .withMessage("last name's length must be less than 65 characters"),
], ValidateRequests_1.validationPass, users_1.updateUserName)
    .delete(ValidateRequests_1.isLoggedIn, users_1.deleteUser);
exports.default = UsersRouter;
