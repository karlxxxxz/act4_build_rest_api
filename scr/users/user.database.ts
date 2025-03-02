import fs from "fs";
import path from "path";  // Ensure correct path handling
import { UnitUser, Users } from "./user.interface";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

const usersFile = path.join(__dirname, "users.json"); // Correct path

// Function to check and create users.json if it doesn't exist
const ensureUsersFile = () => {
    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, JSON.stringify({}, null, 2));
    }
};

const loadUsers = (): Users => {
    ensureUsersFile(); // Ensure the file exists
    try {
        const data = fs.readFileSync(usersFile, "utf-8");
        return JSON.parse(data);
    } catch {
        return {};
    }
};

const saveUsers = (users: Users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

export const findAll = async (): Promise<UnitUser[]> => {
    return Object.values(loadUsers());
};

export const createUser = async (userData: { username: string; email: string; password: string }): Promise<UnitUser> => {
    const users = loadUsers();
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser: UnitUser = { id, ...userData, password: hashedPassword };
    users[id] = newUser;
    saveUsers(users);

    return newUser;
};
