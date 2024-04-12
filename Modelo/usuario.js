import UsuarioDAO from "../Persistencia/usuarioDAO.js";

export default class Usuario {
    #usuarioId
    #usuarioNome
    #usuarioEmail

    constructor(usuarioId, usuarioNome, usuarioEmail) {
        this.#usuarioId = usuarioId;
        this.#usuarioNome = usuarioNome
        this.#usuarioEmail = usuarioEmail
    }

    get usuarioId(){
        return this.#usuarioId;
    }
    set usuarioId (usuarioId) {
        this.#usuarioId = usuarioId;
    }

    get usuarioNome(){
        return this.#usuarioNome;
    }
    set usuarioNome (usuarioNome) {
        this.#usuarioNome = usuarioNome;
    }

    get usuarioEmail(){
        return this.#usuarioEmail;
    }
    set usuarioEmail (usuarioEmail) {
        this.#usuarioEmail = usuarioEmail;
    }

    toJSON(){
        return {
            id: this.#usuarioId,
            nome: this.#usuarioNome,
            email: this.#usuarioEmail
        }
    }

    async consultar(){
        const usuarioDao = new UsuarioDAO();
        return await usuarioDao.consultar();
    }
}