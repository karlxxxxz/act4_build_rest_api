"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db = __importStar(require("./user.database")); // Import your database functions
const router = (0, express_1.Router)();
// ✅ TEST ROUTE -> GET /api/users/test
router.get('/test', (req, res) => {
    res.json({ message: "User routes are working!" });
});
// ✅ GET ALL USERS -> GET /api/users
router.get('/', async (req, res) => {
    try {
        const users = await db.findAll();
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
// ✅ GET SINGLE USER -> GET /api/users/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.findOne(id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// ✅ CREATE USER -> POST /api/users
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await db.create({ username, email, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
});
// ✅ CREATE USER (REGISTER) -> POST /api/users/register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await db.create({ username, email, password });
        res.json({ message: 'User registered successfully', user: newUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to register user' });
    }
});
// ✅ USER LOGIN -> POST /api/users/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.comparePassword(email, password);
        if (user) {
            res.json(user);
        }
        else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login' });
    }
});
// ✅ UPDATE USER -> PUT /api/users/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const updatedUser = await db.update(id, { username, email, password });
        if (updatedUser) {
            res.json({ message: 'User updated successfully', user: updatedUser });
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update user' });
    }
});
// ✅ DELETE USER -> DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.remove(id);
        res.json({ message: 'User deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
exports.default = router;
