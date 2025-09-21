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

    return {id: user};
}