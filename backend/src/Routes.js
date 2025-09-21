import Login from '../src/controller/Login.js'

export default function AdicionarRotas(api) {
    api.use(Login);
}