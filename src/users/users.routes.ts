import { Router, Request, Response } from 'express';
import * as db from './user.database'; // Import your database functions

const router = Router();

// ✅ TEST ROUTE -> GET /api/users/test
router.get('/test', (req: Request, res: Response) => {
    res.json({ message: "User routes are working!" });
});

// ✅ GET ALL USERS -> GET /api/users
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await db.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// ✅ GET SINGLE USER -> GET /api/users/:id
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await db.findOne(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// ✅ CREATE USER -> POST /api/users
router.post('/', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await db.create({ username, email, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// ✅ CREATE USER (REGISTER) -> POST /api/users/register
router.post('/register', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await db.create({ username, email, password });
        res.json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// ✅ USER LOGIN -> POST /api/users/login
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await db.comparePassword(email, password);
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login' });
    }
});

// ✅ UPDATE USER -> PUT /api/users/:id
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const updatedUser = await db.update(id, { username, email, password });
        if (updatedUser) {
            res.json({ message: 'User updated successfully', user: updatedUser });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// ✅ DELETE USER -> DELETE /api/users/:id
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await db.remove(id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

export default router;
