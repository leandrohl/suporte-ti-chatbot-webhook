import CategoriaDAO from "../Persistencia/categoriaDAO.js";

export default class Categoria {
    #categoriaId
    #categoriaDescricao
    #categoriaPrazoAtendimento
    #categoriaUrlImagem

    constructor(categoriaId, categoriaDescricao, categoriaPrazoAtendimento, categoriaUrlImagem) {
        this.#categoriaId = categoriaId;
        this.#categoriaDescricao = categoriaDescricao
        this.#categoriaPrazoAtendimento = categoriaPrazoAtendimento
        this.#categoriaUrlImagem = categoriaUrlImagem
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

    toJSON(){
        return {
            id: this.#categoriaId,
            descricao: this.#categoriaDescricao,
            prazoAtendimento: this.#categoriaPrazoAtendimento,
            urlImagem: this.#categoriaUrlImagem
        }
    }

    async consultar(){
        const categoriaDao = new CategoriaDAO();
        return await categoriaDao.consultar();
    }
}