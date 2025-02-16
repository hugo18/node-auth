import express from 'express';
import { authenticateToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

const orders = [
    {id: 1, username: 'donald', book: '1984', price: 70.0},
    {id: 2, username: 'marcos', book: 'O Precesso', price: 50.5},
    {id: 3, username: 'matheus', book: 'A Metamorfose', price: 45.99},
    {id: 4, username: 'donald', book: 'A Guerra dos Tronos', price: 95.90},

];

router.get('/orders',  authenticateToken, (req, res)=>{
    const userOrders = orders.filter((order) => order.username === req.user.username);
    res.json({userOrders});
});

export default router;