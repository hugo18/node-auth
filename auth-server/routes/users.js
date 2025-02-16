import express from 'express';
import {hashPassword} from '../../utils/bcryptHelpers.js';
import { authenticateToken } from '../../middleware/authMiddleware.js';
import {users} from '../../users.js';
const router = express.Router();

router.post('/users', async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = {username, password: hashedPassword};
    users.push(newUser);
    res.status(201).json({message: 'Usuário criado com sucesso!', newUser});
});


export default router;