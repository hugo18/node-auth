import jwt from 'jsonwebtoken';
import {config} from '../config/env.js';


export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({message: 'Acesso negado!'});
    
    jwt.verify(token, config.accessTokenSecret, (err, user) => {
        if(err) 
            return res.status(403).json({message: 'Token inválido!'});
        
        req.user = user;
        next();  
    });
};