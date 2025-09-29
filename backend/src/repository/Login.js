import { connection } from "./connection.js"

export async function CriarConta(apelido, email, senha) {
    const comando = `
    INSERT INTO Cadastro (nome, email, senha)
    VALUES
    (?,?,?)
    `

    const [info] = await connection.query(comando, [
        apelido, email, senha
    ]);

    const user = info.insertId;

    const comando1 = `
    INSERT INTO Login (id_cadastro, email, senha)
    VALUES
    (?,?,?)
    `

    const [info1] = await connection.query(comando1, [
        user, email, senha
    ])

    const comando2 = `
    INSERT INTO Registros (id_usuario)
    VALUES
    (?)
    `

    const [info2] = await connection.query(comando2, [
        user
    ])

    return { id: user };
}

export async function VerificarLogin(email, senha) {
    const comando = `
    SELECT id_cadastro AS id, senha
    FROM Cadastro
    WHERE email = ?
    AND senha = ?
    LIMIT 1
    `

    const [rows] = await connection.query(comando, [
        email, senha
    ])

    const [user] = rows;

    return user;
}

export async function ListarRegistros(id_usuario) {
    const comando = `
    SELECT titulo, data_registro, registro
    FROM Registro_unico
    WHERE id_usuario = ?;
    `

    const [info] = await connection.query(comando, [id_usuario])

    return info;
}

export async function EnviarRegistro(titulo, data_registro, registro, id_usuario) {
    const comando = `
    INSERT INTO Registro_unico (id_registro, id_usuario, titulo, data_registro, registro)
    VALUES
    (?,?,?,?,?)
    `

    const [info] = await connection.query(comando, [
        id_usuario,
        id_usuario,
        titulo,
        data_registro,
        registro
    ])

    return info;
}