
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

}