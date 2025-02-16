import express from 'express';
import jwt from 'jsonwebtoken';
import { comparePasswords } from '../utils/bcryptHelpers.js';
import {users} from '../../users.js';

const router = express.Router();
    
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = users.find((u) => u.username === username);    
    if(!user){
        return res.status(400).json({message: 'Usuário não encontrado!'});
    }
    const isMatch = await comparePasswords(password, user.password);

    if(!isMatch){
        return res.status(403).json({message: 'Credenciais inválidas!'});
    }
    const accessToken = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, {
     expiresIn: '15m'   
    });

    res.json({accessToken});
});

export default router;