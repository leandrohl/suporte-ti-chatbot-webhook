
import Chamado from "../Modelo/chamado.js";
import conectar from "./conexao.js";

export default class ChamadoDAO {
    async gravar(chamado) {
        if (chamado instanceof Chamado) {
            const conexao = await conectar();
            const sql = 'INSERT INTO chamado (nomeTecnico, nivelPrioridade, categoriaId, usuarioId) VALUES (?, ?, ?, ?)';
            const parametros = [docchamadoe.nomeTecnico, chamado.nivelPrioridade, chamado.categoria.categoriaId, chamado.usuario.usuarioId];

            const resultado = await conexao.query(sql, parametros);
            chamado.chamadoId = resultado[0].insertId;
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = 'SELECT * FROM chamado';

        const [ registros ] = await conexao.query(sql);
        const listaChamados = []

        for (const registro of registros) {
            const chamado = new Chamado(registro.id, registro.nomeTecnico, registro.nivelPrioridade, registro.categoriaId, registro.usuarioId);
            listaChamados.push(chamado);
        }
        return listaChamados;
    }

}