import ChamadoDAO from "../Persistencia/chamadoDAO.js";

export default class Chamado {
    #chamadoId
    #chamadoNomeTecnico
    #chamadoNivelPrioridade
    #categoria
    #usuario

    constructor(chamadoId, chamadoNomeTecnico, chamadoNivelPrioridade, categoria, usuario) {
        this.#chamadoId = chamadoId;
        this.#chamadoNomeTecnico = chamadoNomeTecnico
        this.#chamadoNivelPrioridade = chamadoNivelPrioridade
        this.#categoria = categoria
        this.#usuario = usuario
    }

    get chamadoId(){
        return this.#chamadoId;
    }
    set chamadoId (chamadoId) {
        this.#chamadoId = chamadoId;
    }

    get chamadoNomeTecnico(){
        return this.#chamadoNomeTecnico;
    }
    set chamadoNomeTecnico (chamadoNomeTecnico) {
        this.#chamadoNomeTecnico = chamadoNomeTecnico;
    }

    get chamadoNivelPrioridade(){
        return this.#chamadoNivelPrioridade;
    }
    set chamadoNivelPrioridade (chamadoNivelPrioridade) {
        this.#chamadoNivelPrioridade = chamadoNivelPrioridade;
    }

    get categoria(){
        return this.#categoria;
    }
    set categoria (categoria) {
        this.#categoria = categoria;
    }

    get usuario(){
        return this.#usuario;
    }
    set usuario (usuario) {
        this.#usuario = usuario;
    }

    toJSON(){
        return {
            id: this.#chamadoId,
            nomeTecnico: this.#chamadoNomeTecnico,
            nivelPrioridade: this.chamadoNivelPrioridade,
            categoria: this.categoria.categoriaId,
            usuario: this.usuario.usuarioId
        }
    }

    async gravar(){
        const chamadoDao = new ChamadoDAO();
        await chamadoDao.gravar(this);
    }

    async consultar(){
        const chamadoDao = new ChamadoDAO();
        return await chamadoDao.consultar();
    }

}