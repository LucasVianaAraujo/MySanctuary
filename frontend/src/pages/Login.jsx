import { Link } from 'react-router'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import './Login.scss'

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
            const resp = await axios.post('http://localhost:5001/login/usuario', {
                email, senha
            })

            const token = resp.data.token;
            const usuario = resp.data.usuario;

            if (!token) {
                throw new Error("Token não recebido");
            }

            localStorage.setItem("token", token);
            if (usuario) {
                localStorage.setItem("usuario", JSON.stringify(usuario))
            }

            alert('Usuário Encontrado!')
            navigate('/Registro')

        } catch (err) {
            alert('Erro ao verificar cadastro')
            console.log(err)
        }
    }

    return (
        <div className="fundo-colorido">
            <header className='alinhador-topo'>
                <div className="lado-esquerdo">
                    <h1>MySanctuary</h1>
                </div>
                <div className="lado-direito">
                    <h3>Início</h3>
                    <h3>Sobre</h3>
                    <h3>Contato</h3>
                    <h3>Registrar</h3>
                </div>
            </header>
            <div className="login">
                <div className="lado-esquerdo">
                    <h1>Bem-vindo ao <span>MySanctuary</span></h1>
                    <h3>DIÁRIO VIRTUAL</h3>
                    <h4>Acesse seu espaço seguro e privado para registrar pensamentos, momentos e memórias. Faça login para visualizar, criar ou atualizar suas entradas com total proteção. Interface simples e intuitiva, pensada para que você foque apenas nas suas histórias.</h4>
                </div>
                <div className="lado-direito">
                    <div className="caixa">
                        <h1>Login</h1>
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
            </div>
        </div>
    )
}
