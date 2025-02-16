import express from 'express';
import {config} from '../config/env.js';
import ordersRouter from './routes/orders.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';


const app = express();
//console.log(config.accessTokenSecret);
//console.log(config.jwtsecret);


app.use(express.json());
app.use('/api', ordersRouter);
app.use('/api', usersRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
    res.send('App modular Node.js');
});

export const startServer = () => {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
};