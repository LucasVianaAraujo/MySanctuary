import { useState } from "react";
import api from "../../api.js";

export default function Envio() {
    const [titulo, setTitulo] = useState('');
    const [data_registro, setData] = useState('');
    const [registro, setRegistro] = useState('');

    async function EnviarRegistroBackend() {
        try {
            const token = localStorage.getItem("token"); // que problemão hein amigo, como você pretende usar o token salvo no header sem puxar a requisição que tinha feito anteriormente no localStorage? kkkkkkkkk

            await api.post('/EnviarRegistro', {
                "titulo": titulo,
                "data_registro": data_registro,
                "registro": registro
            }, {
                headers: { 'x-access-token': token }
            })
        }

        catch (err) {
            alert('Erro ao enviar registro!');
            return;
        }
    }

    return (
        <div>
            <label>Titulo</label>
            <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} />

            <label>Data-Registro</label>
            <input type="date" value={data_registro} onChange={e => setData(e.target.value)} />

            <label>Registro</label>
            <input type="text" value={registro} onChange={e => setRegistro(e.target.value)} />

            <button onClick={EnviarRegistroBackend}>Enviar</button>
        </div>
    )
}