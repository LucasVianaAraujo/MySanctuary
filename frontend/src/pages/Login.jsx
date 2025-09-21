import { Link } from 'react-router'

import gato from '../assets/images/gato.png'

import './Login.scss'

export default function Login() {
    return (
        <div className="fundo_colorido">
            <div className="login">
                <div className="lado_esquerdo">
                    <div className="caixa_invisivel_texto">
                        <h3>Bem-vindo ao</h3>
                        <h1>My Sanctuary</h1>
                        <label>Email</label>
                        <input />
                        <label>Senha</label>
                        <input />
                        <button>LOGIN</button>
                        <h4>Não tem uma conta?
                            <Link to={'/Cadastro'}>
                                <span>Criar Agora.</span>
                            </Link>
                        </h4>

                    </div>
                </div>
                <div className="lado_direito">
                    <img src={gato} alt="" />
                </div>
            </div>
        </div>
    )
}
