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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_database_1 = require("../users/user.database"); // Ensure correct import path
const userRouter = (0, express_1.Router)();
userRouter.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_database_1.findAll)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving users", error });
    }
}));
userRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newUser = yield (0, user_database_1.createUser)({ username, email, password });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
}));
exports.default = userRouter;
