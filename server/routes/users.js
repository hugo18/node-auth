import express from 'express';
import bcrypt from 'bcrypt';
import {hashPassword} from '../utils/bcryptHelpers.js';
const router = express.Router();

const users = [];


router.get('/users', (req, res) => {
    res.json({users});
});

router.post('/users', async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = {username, password: hashedPassword};
    users.push(newUser);
    res.status(201).json({message: 'Usuário criado com sucesso!', newUser});
});


export default router;