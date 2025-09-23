import { Link } from 'react-router'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import api from '../api.js';
import './Login.scss'

import gato from '../assets/images/gato.png'

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function VerificarLogin() {
        if (!email || !senha) {
            alert('Email ou senha inválido')
            return;
        }

        try {
            const resp = await api.get('/login/usuario/' + email + '/' + senha)
            const token = resp.data.token;

            if (!token) {
                throw new Error("Token não recebido");
            }

            localStorage.setItem("token", token);
            alert('Usuário Encontrado!')
            navigate('/Registro')

        } catch (error) {
            alert('Erro ao verificar cadastro')
        }
    }

    return (
        <div className="fundo_colorido">
            <div className="login">
                <div className="lado_esquerdo">
                    <div className="caixa_invisivel_texto">
                        <div className="titulo">
                            <h3>Bem-vindo ao</h3>
                            <h1>My Sanctuary</h1>
                        </div>
                        <label>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Senha</label>
                        <input type='password' value={senha} onChange={(e) => setSenha(e.target.value)} />
                        <button onClick={VerificarLogin}>LOGIN</button>
                        <div className="cadastrar">
                            <h4>Não tem uma conta?
                                <Link to={'/Cadastro'}>
                                    <span>Criar Agora.</span>
                                </Link>
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="lado_direito">
                    <img src={gato} alt="" />
                </div>
            </div>
        </div>
    )
}
