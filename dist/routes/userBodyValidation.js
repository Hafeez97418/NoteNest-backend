"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const bodyValidation = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email").trim().notEmpty(),
    (0, express_validator_1.body)("firstName")
        .isLength({ min: 1, max: 50 })
        .withMessage("first name must be minimum 1 and maximum 50 characters long"),
    (0, express_validator_1.body)("lastName")
        .isLength({ max: 64 })
        .withMessage("last name's length must be less than 65 characters"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6, max: 64 })
        .withMessage("password's length must be minimum of 6 and maximum of 64 characters"),
];
exports.bodyValidation = bodyValidation;
const registerValidation = [
    (0, express_validator_1.body)("user.email").isEmail().withMessage("Invalid email").trim().notEmpty(),
    (0, express_validator_1.body)("user.firstName")
        .isLength({ min: 1, max: 50 })
        .withMessage("first name must be minimum 1 and maximum 50 characters long"),
    (0, express_validator_1.body)("user.lastName")
        .isLength({ max: 64 })
        .withMessage("last name's length must be less than 65 characters"),
    (0, express_validator_1.body)("user.password")
        .isLength({ min: 6, max: 64 })
        .withMessage("password's length must be minimum of 6 and maximum of 64 characters"),
    (0, express_validator_1.body)("user._id").notEmpty(),
    (0, express_validator_1.body)("otp").notEmpty(),
];
exports.registerValidation = registerValidation;
