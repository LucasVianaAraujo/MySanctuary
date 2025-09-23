import api from '../api.js';

import { useState } from 'react'
import './Registros.scss'

export default function Registros() {
    const [content, setContent] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState('');
    const [registro, setRegistro] = useState('');

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

    return (
        <div className="fundo_colorido2">
            <div><h1>Você não possui nenhum registro ainda...</h1></div>
            <button onClick={LerRegistro}>COMEÇAR</button>

            {
                content.map(registro => {
                    return <div>
                        <h1>{registro.titulo}</h1>
                        <h2>{registro.data_registro}</h2>
                        <h3>{registro.registro}</h3>
                    </div>
                })
            }
        </div>
    )
}
