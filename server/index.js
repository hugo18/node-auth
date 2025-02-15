import express from 'express';
import {config} from '../config/env.js';
import ordersRouter from './routes/orders.js';

const app = express();

app.use('/api', ordersRouter);

app.get('/', (req, res) => {
    res.send('App modular Node.js');
});

export const startServer = () => {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
};