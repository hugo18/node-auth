import express from 'express';
import jwt from 'jsonwebtoken';
import { comparePasswords } from '../../utils/bcryptHelpers.js';
import { users } from '../../users.js';
import { config } from '../../config/env.js';

const refreshTokens = [];

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
    const accessToken = jwt.sign({username}, config.accessTokenSecret, {
        expiresIn: '1m'   
    });
    
    const refreshToken = jwt.sign({username}, config.refreshTokenSecret, {
        expiresIn: '10m'  
    });
    
    refreshTokens.push(refreshToken);
    res.json({accessToken, refreshToken});
});

router.post('/token', async (req, res) => {
    const {refreshToken} = req.body;
    if(!refreshToken)
        return res.status(401).send('É necessário passar o refresh token.');    
    if(!refreshTokens.includes(refreshToken))
        return res.status(403).send('Refresh token inválido.');
    
    let newAccessToken;
    
    jwt.verify(refreshToken, config.refreshTokenSecret, (err, user) => {
        if(err) 
            return res.status(403).send('Refresh token inválido.')
        newAccessToken = jwt.sign(user, config.accessTokenSecret);
    });
    
    res.json({accessToken: newAccessToken});
});

router.post('/logout', async (req, res) => {
    const {refreshToken} = req.body;
    const index = refreshTokens.indexOf(refreshToken);
    
    if(index > -1) 
        refreshTokens.splice(index, 1);

    res.send('Foi desconectado!');
});

export default router;