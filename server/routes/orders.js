import express from 'express';

const router = express.Router();

const orders = [
    {id: 'order1', book: '1984', uid: 'user1', order_total: 2},
    {id: 'order2', book: 'O Precesso', uid: 'user2', order_total: 1},
    {id: 'order3', book: 'A Metamorfose', uid: 'user3', order_total: 3}
];

router.get('/orders', (req, res)=>{
    res.json({orders});
});

export default router;