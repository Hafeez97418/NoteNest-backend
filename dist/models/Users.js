"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UsersSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [1, "First name must be at least 1 character long"],
        maxlength: [50, "First name must be less than 50 characters"],
    },
    lastName: {
        type: String,
        maxlength: [64, "Last name must be less than 64 characters"],
    },
    email: { type: String, unique: true, required: true },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [64, "Password must be less than 64 characters"],
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    role: { type: String, enum: ["user", "admin"], default: "user" },
});
const Users = (0, mongoose_1.model)("Users", UsersSchema);
Users.createIndexes();
exports.default = Users;
