import { CriarConta } from '../repository/Login.js'

import { Router } from "express";
import { generateToken } from '../utils/jwt.js';

const endpoint = Router();

endpoint.post('/cadastrar/usuario/:apelido/:email/:senha', async (req, resp) => {
        const apelido = req.params.apelido;
    const email = req.params.email;
    const senha = req.params.senha;

    const registro = await CriarConta(apelido, email, senha);
    resp.send({ token: generateToken(registro) });
})

export default endpoint;