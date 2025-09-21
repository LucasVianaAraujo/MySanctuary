import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Login.jsx'
import Cadastro from './Cadastro.jsx'
import Registros from './Registros.jsx'

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/Cadastro' element={<Cadastro/>}/>
                <Route path='/Registro' element={<Registros/>}/>
            </Routes>
        </BrowserRouter>
    )
}