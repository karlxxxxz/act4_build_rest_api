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
exports.createUser = exports.findAll = void 0;
const fs_1 = require("fs");
const path_1 = require("path"); // Ensure correct path handling
const uuid_1 = require("uuid");
const bcryptjs_1 = require("bcryptjs");
const usersFile = path_1.default.join(__dirname, "users.json"); // Correct path
// Function to check and create users.json if it doesn't exist
const ensureUsersFile = () => {
    if (!fs_1.default.existsSync(usersFile)) {
        fs_1.default.writeFileSync(usersFile, JSON.stringify({}, null, 2));
    }
};
const loadUsers = () => {
    ensureUsersFile(); // Ensure the file exists
    try {
        const data = fs_1.default.readFileSync(usersFile, "utf-8");
        return JSON.parse(data);
    }
    catch (_a) {
        return {};
    }
};
const saveUsers = (users) => {
    fs_1.default.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Object.values(loadUsers());
});
exports.findAll = findAll;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const users = loadUsers();
    const id = (0, uuid_1.v4)();
    const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 10);
    const newUser = Object.assign(Object.assign({ id }, userData), { password: hashedPassword });
    users[id] = newUser;
    saveUsers(users);
    return newUser;
});
exports.createUser = createUser;
