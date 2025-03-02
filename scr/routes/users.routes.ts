import { Router, Request, Response } from "express";
import { findAll, createUser } from "../users/user.database"; // Ensure correct import path

const userRouter = Router();

userRouter.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error });
    }
});

userRouter.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = await createUser({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

export default userRouter;
