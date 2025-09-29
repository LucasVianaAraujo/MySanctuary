import { Link } from 'react-router-dom';

import api from '../api.js'

import { useState, useEffect, use } from 'react'
import './Registros.scss'

export default function Registros() {
    const [content, setContent] = useState([]);
    const [user, setUserInfo] = useState([]);

    async function LerRegistro() {
        try {
            const token = localStorage.getItem('token');
            console.log('Token recebido com sucesso, meu nobre!', token) // verifica se o token foi recebido, sempre lembrar de tirar

            const resp = await api.get('/mapear/registros', { // endpoint só é carregado se o token for autorizado
                headers: { 'x-access-token': token } // envia o token para o header automaticamente
            })

            setContent(resp.data) // carrega tudo que eu escolhi pra ser exibido no renderizador

        } 
        
        catch (err) {
            alert('Erro ao mapear registros')
            console.log(err)
        }
    }

    useEffect(() => {
        LerRegistro() // esse useEffect vai carregar os registros automaticamente sem a necessidade de clicar em um botão
    }, []);

    async function InfoUsuario() {
        try {
            const token = localStorage.getItem('token');
            console.log('Token recebido novamente', token);

            const resp = await api.get('/BuscarCredenciais', {
                headers: { 'x-access-token': token }
            });

            setUserInfo(resp.data);
            console.log(resp.data);
        }

        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        InfoUsuario()
    }, [])

    if (content.length === 0) { // validação que verifica se existe algo dentro da variável de estado (array) content
        return (
            <div className="fundo_colorido2">
                <header>
                    <Link to={'/'}>
                        <div className="logo">
                            <h1>My Sanctuary</h1>
                        </div>
                    </Link>
                    <div className="perfil">
                        <div className="pic" />
                        <h1>
                            {
                                user.map((cred, pos) => {
                                    return <div key={pos}>
                                        <h1>{cred.nome}</h1>
                                    </div>
                                })
                            }
                        </h1>
                    </div>
                </header>
                <div className='vazio'>
                    <h1>Você não possui nenhum registro ainda...</h1>
                    <button onClick={LerRegistro}>COMEÇAR</button>
                </div>
            </div>
        )
    }

    return (
        <div className="fundo_colorido2">
            <header>
                <Link to={'/'}>
                    <div className="logo">
                        <h1>My Sanctuary</h1>
                    </div>
                </Link>
                <div className="perfil">
                    <div className="pic" />
                    <h1>
                        {
                            user.map((cred, pos) => {
                                return <div key={pos}>
                                    <h1>{cred.nome}</h1>
                                </div>
                            })
                        }
                    </h1>
                </div>
            </header>

            <div className="campo_notas">

                {
                    content.map((registro, pos) => { // adicionar o pos é uma boa prática para checagem de posição do objeto
                        return <div key={pos} className='notas'>
                            <h1>{registro.titulo}</h1>
                            <div className="image"></div>
                            <h2>{registro.data_registro.split("T")[0]}</h2>
                            <h3>{registro.registro}</h3>
                        </div>
                    })
                }

            </div>
        </div>
    )
}
