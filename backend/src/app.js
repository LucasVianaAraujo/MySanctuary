import AdicionarRotas from './Routes.js';

import express from 'express'
import cors from 'cors'

const api = express();

api.use(express.json());
api.use(cors());

AdicionarRotas(api);

const PORT = process.env.PORT || 5001;

api.listen(PORT, () => console.log('Conectado ao MySQL'));