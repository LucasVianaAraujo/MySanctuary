import { Link } from 'react-router';

import api from '../api.js';

import { useState } from 'react'
import './Registros.scss'

export default function Registros() {
    const [content, setContent] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState('');
    const [registro, setRegistro] = useState('');

    // sintaxe padrão para preenchimento de token automático
    async function LerRegistro() {
        try {
            const token = localStorage.getItem('token');

            const resp = await api.get('/mapear/registros', {
                headers: { 'x-access-token': token }
            })

            setContent(resp.data);
        } catch (error) {
            alert('Erro ao mapear registros')
        }
    }

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
                    <h1>Lucas Viana</h1>
                </div>
            </header>

            <div className="campo_notas">
                {
                    content.map(registro => {
                        return <div className='notas'>
                            <h1>{registro.titulo}</h1>
                            <div className="image"></div>
                            <h2>{registro.data_registro}</h2>
                            <h3>{registro.registro}</h3>
                        </div>
                    })
                }
                <button onClick={LerRegistro}>COMEÇAR</button>
            </div>


        </div>
    )
}
