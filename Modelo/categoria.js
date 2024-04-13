import CategoriaDAO from "../Persistencia/categoriaDAO.js";

export default class Categoria {
    #categoriaId
    #categoriaDescricao
    #categoriaPrazoAtendimento
    #categoriaUrlImagem
    #categoriaNomeTecnico

    constructor(categoriaId, categoriaDescricao, categoriaPrazoAtendimento, categoriaUrlImagem, categoriaNomeTecnico) {
        this.#categoriaId = categoriaId;
        this.#categoriaDescricao = categoriaDescricao
        this.#categoriaPrazoAtendimento = categoriaPrazoAtendimento
        this.#categoriaUrlImagem = categoriaUrlImagem
        this.#categoriaNomeTecnico = categoriaNomeTecnico
    }

    get categoriaId(){
        return this.#categoriaId;
    }
    set categoriaId (categoriaId) {
        this.#categoriaId = categoriaId;
    }

    get categoriaDescricao(){
        return this.#categoriaDescricao;
    }
    set categoriaDescricao (categoriaDescricao) {
        this.#categoriaDescricao = categoriaDescricao;
    }

    get categoriaPrazoAtendimento(){
        return this.#categoriaPrazoAtendimento;
    }
    set categoriaPrazoAtendimento (categoriaPrazoAtendimento) {
        this.#categoriaPrazoAtendimento = categoriaPrazoAtendimento;
    }

    get categoriaUrlImagem(){
        return this.#categoriaUrlImagem;
    }
    set categoriaUrlImagem (categoriaUrlImagem) {
        this.#categoriaUrlImagem = categoriaUrlImagem;
    }

    get categoriaNomeTecnico(){
        return this.#categoriaNomeTecnico;
    }
    set categoriaNomeTecnico (categoriaNomeTecnico) {
        this.#categoriaNomeTecnico = categoriaNomeTecnico;
    }


    toJSON(){
        return {
            id: this.#categoriaId,
            descricao: this.#categoriaDescricao,
            prazoAtendimento: this.#categoriaPrazoAtendimento,
            urlImagem: this.#categoriaUrlImagem,
            nomeTecnico: this.#categoriaNomeTecnico
        }
    }


    async consultar(){
        const categoriaDao = new CategoriaDAO();
        return await categoriaDao.consultar();
    }

    async consultarPeloNome(nomeCategoria){
        const categoriaDao = new CategoriaDAO();
        return await categoriaDao.consultarPeloNome(nomeCategoria);
    }

    async consultarPorId(id){
        const categoriaDao = new CategoriaDAO();
        return await categoriaDao.consultarPorId(id);
    }
}