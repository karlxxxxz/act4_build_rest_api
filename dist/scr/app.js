"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = require("dotenv");
const cors_1 = require("cors");
const helmet_1 = require("helmet");
const users_routes_1 = require("./routes/users.routes"); // Ensure correct import path
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 7000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
// Routes
app.use("/api", users_routes_1.default); // Ensure correct route usage
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
