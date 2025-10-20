import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../components/Login.jsx'
import Cadastro from '../components/Cadastro.jsx'
import Registros from './Registros.jsx'
import EnvioRegistro from './EnvioRegistro'

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/Cadastro' element={<Cadastro/>}/>
                <Route path='/Registro' element={<Registros/>}/>
                <Route path='/EnvioRegistro' element={<EnvioRegistro/>}/>
            </Routes>
        </BrowserRouter>
    )
}