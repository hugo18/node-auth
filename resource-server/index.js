import express from 'express';
import ordersRouter from './routes/orders.js';

const app = express();

app.use(express.json());
app.use('/api', ordersRouter);


app.get('/', (req, res) => {
    res.send('App modular Node.js');
});

export const startServer = () => {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor de recursos em http://localhost:${PORT}`);
    });
};