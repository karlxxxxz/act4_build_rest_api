import express from "express";
import userRouter from "./users/users.routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/api", userRouter); // Prefix routes with /api

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
