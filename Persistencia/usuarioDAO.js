
import Usuario from "../Modelo/usuario.js";
import conectar from "./conexao.js";

export default class UsuarioDAO {
    async consultar() {
        const conexao = await conectar();
        const sql = 'SELECT * FROM usuario';

        const [ registros ] = await conexao.query(sql);
        const listaUsuarios = []

        for (const registro of registros) {
            const usuario = new Usuario(registro.id, registro.nome, registro.email);
            listaUsuarios.push(usuario);
        }
        return listaUsuarios;
    }

    async gravar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = 'INSERT INTO usuario (nome, email) VALUES (?, ?)';
            const parametros = [usuario.usuarioNome, usuario.usuarioEmail];

            const resultado = await conexao.query(sql, parametros);
            usuario.usuarioId = resultado[0].insertId;
        }
    }

    async consultarPorId(id) {
        const conexao = await conectar();
        const sql = 'SELECT * FROM usuario WHERE id = ?';
        const parametros = [id]

        const [ registros ] = await conexao.query(sql, parametros);
        let usuario = null;

        for (const registro of registros) {
            usuario = new Usuario(registro.id, registro.nome, registro.email);
            break;
        }
        return usuario;
    }

    async consultarPorEmail(email) {
        const conexao = await conectar();
        const sql = 'SELECT * FROM usuario WHERE email = ?';
        const parametros = [email]

        const [ registros ] = await conexao.query(sql, parametros);
        let usuario = null;

        for (const registro of registros) {
            usuario = new Usuario(registro.id, registro.nome, registro.email);
            break;
        }
        return usuario;
    }

}