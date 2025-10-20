import { CriarConta, VerificarLogin, ListarRegistros, EnviarRegistro, BuscarInfo, DeletarRegistro } from '../repository/Login.js'

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
    resp.send({ token: generateToken({ id: registro.id }) });
})

endpoint.post('/login/usuario', async (req, resp) => {
    const email = req.body.email;
    const senha = req.body.senha;

    const registro = await VerificarLogin(email, senha);
    resp.send({ token: generateToken({ id: registro.id }), usuario: registro });
})

endpoint.get('/mapear/registros', autenticar, async (req, resp) => {
    const id = req.user.id;

    const registro = await ListarRegistros(id);
    resp.send(registro);
})

endpoint.post('/EnviarRegistro', autenticar, async (req, resp) => {
    const titulo = req.body.titulo;
    const data_registro = req.body.data_registro;
    const registros = req.body.registro;
    const id = req.user.id;

    if (!titulo || !data_registro || !registros) {
        console.log('Deu ruim aí amigão');
        throw new Error();
    }

    const registro = await EnviarRegistro(titulo, data_registro, registros, id);
    resp.send(registro);
})

endpoint.get('/BuscarCredenciais', autenticar, async (req, resp) => {
    const usuario_id = req.user.id;
    const registro = await BuscarInfo(usuario_id);
    resp.send(registro);
})

endpoint.delete('/DeletarRegistro/:id', autenticar, async (req, resp) => {
    const id_registro = req.params.id;

    const registro = await DeletarRegistro(id_registro);
    resp.send({ RegistroUnico: (registro) });
})

export default endpoint;