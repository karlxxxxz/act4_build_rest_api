import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./routes/users.routes"; // Ensure correct import path

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Routes
app.use("/api", userRouter); // Ensure correct route usage

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
