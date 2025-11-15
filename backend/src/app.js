import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './utils/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use('/', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ erro: 'Algo deu errado!' });
});

app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
