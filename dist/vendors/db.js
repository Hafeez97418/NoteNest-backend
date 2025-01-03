"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../middleware/Error");
const mongoose_1 = __importDefault(require("mongoose"));
const ConnectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = process.env.DB_URI_DEV;
    try {
        if (uri === undefined) {
            const err = new Error_1.CustomError("db uri is undefined");
            err.name = "DB_URI_UNDEFINED";
            throw err;
        }
        yield mongoose_1.default.connect(uri);
        console.log("Database is connected");
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`${err.name}:${err.message}`);
        }
    }
});
exports.default = ConnectDatabase;
