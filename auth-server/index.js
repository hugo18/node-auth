import express from 'express';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/auth', usersRouter);


app.get('/', (req, res) => {
    res.send('App modular Node.js');
});

export const startServer2 = () => {
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Servidor de autenticação rodando em http://localhost:${PORT}`);
    }); 
};