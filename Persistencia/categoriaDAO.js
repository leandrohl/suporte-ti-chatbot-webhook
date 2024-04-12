
import Categoria from "../Modelo/categoria.js";
import conectar from "./conexao.js";

export default class CategoriaDAO {
    async consultar() {
        const conexao = await conectar();
        const sql = 'SELECT * FROM categoria';

        const [ registros ] = await conexao.query(sql);
        const listaCategorias = []

        for (const registro of registros) {
            const categoria = new Categoria(registro.id, registro.descricao, registro.prazoAtendimento, registro.urlImagem);
            listaCategorias.push(categoria);
        }
        return listaCategorias;
    }
    
    async consultarPeloNome(nomeCategoria) {
        const conexao = await conectar();
        const sql = 'SELECT * FROM categoria WHERE descricao = ?';
        const parametros = [nomeCategoria]

        const [ registros ] = await conexao.query(sql, parametros);
        let categoria = null;

        for (const registro of registros) {
            categoria = new Categoria(registro.id, registro.descricao, registro.prazoAtendimento, registro.urlImagem);
            break;
        }
        return categoria;
    }

}