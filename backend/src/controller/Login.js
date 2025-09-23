import { CriarConta, VerificarLogin, ListarRegistros } from '../repository/Login.js'

import { getAuthentication } from '../utils/jwt.js';

import { Router } from "express";
import { generateToken } from '../utils/jwt.js';

const endpoint = Router();
const autenticar = getAuthentication();

endpoint.post('/cadastrar/usuario/:apelido/:email/:senha', async (req, resp) => {
    const apelido = req.params.apelido;
    const email = req.params.email;
    const senha = req.params.senha;

    const registro = await CriarConta(apelido, email, senha);
    resp.send({ token: generateToken({id: registro.id}) });
})

endpoint.get('/login/usuario/:email/:senha', async (req,resp) => {
    const email = req.params.email;
    const senha = req.params.senha;
    
    const registro = await VerificarLogin(email,senha);
    resp.send({token: generateToken({id: registro.id})});
})

endpoint.get('/mapear/registros', autenticar, async (req,resp) => {
    const id = req.user.id;

    const registro = await ListarRegistros(id);
    resp.send(registro);
})

export default endpoint;