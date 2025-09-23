import api from "../api.js";

import { Link } from "react-router"
import { useNavigate } from "react-router";
import { useState } from "react"

import './Cadastro.scss'

export default function Cadastro() {
    const [apelido, setApelido] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate(); // Sempre esqueço que o useNavigate fica dentro da função principal...

    async function EnviarLogin() {
        if (!apelido || !email || !senha) {
            alert('Erro ao Cadastrar')
        }

        try {
            await api.post('cadastrar/usuario/' + apelido + '/' + email + '/' + senha, {
                "apelido": apelido,
                "email": email,
                "senha": senha
            })
                .then(() => alert('Usuário Cadastrado!'))
            navigate('/')
                .catch(() => alert('Opa, deu ruim'))

        } catch (err) {

        }
    }

    return (
        <div className="fundo_colorido1">
            <div className="cadastro">
                <div className="caixa_invisivel_texto">
                    <label>Apelido</label>
                    <input value={apelido} onChange={(e) => setApelido(e.target.value)} />
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Senha</label>
                    <input value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <button onClick={EnviarLogin}>LOGIN</button>
                    <h4>Já possui cadastro?
                        <Link to={'/'}>
                            <span>Voltar.</span>
                        </Link>
                    </h4>
                </div>
            </div>
        </div>
    )
}