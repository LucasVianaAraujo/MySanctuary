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

    const usuario = info.insertId;

    const comando1 = `
    INSERT INTO Login (id_cadastro, email, senha)
    VALUES
    (?,?,?)
    `

    const [info1] = await connection.query(comando1, [
        usuario, email, senha
    ])

    const comando2 = `
    INSERT INTO Registros (id_usuario)
    VALUES
    (?)
    `

    const [info2] = await connection.query(comando2, [
        usuario
    ])

    return { id: usuario };
}

export async function VerificarLogin(email, senha) {
    const comando = `
    SELECT id_cadastro AS id, nome, email
    FROM Cadastro
    WHERE email = ?
    AND senha = ?
    LIMIT 1
    `

    const [linhas] = await connection.query(comando, [
        email, senha
    ])

    const [usuario] = linhas;

    return usuario;
}

export async function ListarRegistros(id_usuario) {
    const comando = `
    SELECT id_registro_unico, titulo, data_registro, registro
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

export async function BuscarInfo(usuario_id) {
    const comando = `
    SELECT cadastro.nome, login.email, login.senha
    FROM cadastro
    INNER JOIN login ON cadastro.id_cadastro = login.id_usuario
    WHERE id_usuario = ?
    `

    const [info] = await connection.query(comando, [
        usuario_id
    ]);
    return info;
}

export async function DeletarRegistro(id_registro) {
    const comando = `
    DELETE FROM Registro_Unico
    WHERE id_registro_unico = ?
    `

    const [info] = await connection.query(comando, [
        id_registro
    ])
    return info.affectedRows;
}