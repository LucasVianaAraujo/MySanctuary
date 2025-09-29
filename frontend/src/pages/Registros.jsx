import { Link } from 'react-router';

import api from '../api.js';

import { useState, useEffect } from 'react'
import './Registros.scss'

export default function Registros() {
    const [userinfo, setUserInfo] = useState('');
    const [content, setContent] = useState([]);

    async function LerRegistro() {
        try {
            const token = localStorage.getItem('token');
            console.log('Token recebido com sucesso, meu nobre!', token)

            const resp = await api.get('/mapear/registros', {
                headers: { 'x-access-token': token }
            })

            setUser(resp.data.nome);
        } catch (err) {
            alert('Erro ao mapear registros')
            console.log(err)
        }
    }

    useEffect(() => {
        LerRegistro()
    }, []);

    if (content.length === 0) {
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
                        <h1>Lucas Viana</h1>
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
                    <h1>{resp.data.nome}</h1>
                </div>
            </header>

            <div className="campo_notas">

                {
                    content.map((registro, pos) => {
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
