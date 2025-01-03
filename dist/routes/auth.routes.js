"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const userBodyValidation_1 = require("./userBodyValidation");
const express_validator_1 = require("express-validator");
const ValidateRequests_1 = require("../middleware/ValidateRequests");
const authRouter = (0, express_1.Router)();
authRouter.post("/user/register", userBodyValidation_1.registerValidation, ValidateRequests_1.validationPass, auth_1.register);
authRouter.post("/user/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("invalid email"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("your password is empty"),
], ValidateRequests_1.validationPass, auth_1.login);
authRouter.post("/user/logout", ValidateRequests_1.isLoggedIn, auth_1.logout);
exports.default = authRouter;
