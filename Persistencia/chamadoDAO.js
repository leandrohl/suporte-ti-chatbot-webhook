
import Categoria from "../Modelo/categoria.js";
import Chamado from "../Modelo/chamado.js";
import Usuario from "../Modelo/usuario.js";
import conectar from "./conexao.js";

export default class ChamadoDAO {
    async gravar(chamado) {
        if (chamado instanceof Chamado) {
            const conexao = await conectar();
            const sql = 'INSERT INTO chamado (nomeTecnico, nivelPrioridade, categoriaId, usuarioId) VALUES (?, ?, ?, ?)';
            const parametros = [chamado.chamadoNomeTecnico, chamado.chamadoNivelPrioridade, chamado.categoria.categoriaId, chamado.usuario.usuarioId];

            const resultado = await conexao.query(sql, parametros);
            chamado.chamadoId = resultado[0].insertId;
        }
    }

    async consultar(numeroChamado) {
        const conexao = await conectar();
        const sql = 'SELECT * FROM chamado WHERE id = ?';
        const parametros = [numeroChamado]

        const [ registros ] = await conexao.query(sql, parametros);
        let chamado = null;

        for (const registro of registros) {
            chamado = new Chamado(registro.id, registro.nomeTecnico, registro.nivelPrioridade, new Categoria(registro.categoriaId), new Usuario(registro.usuarioId) );
            break;
        }
        return chamado;
    }

}