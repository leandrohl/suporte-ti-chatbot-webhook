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

    async consultarPorId(id){
        const usuarioDao = new UsuarioDAO();
        return await usuarioDao.consultarPorId(id);
    }

    async consultarPorEmail(email){
        const usuarioDao = new UsuarioDAO();
        return await usuarioDao.consultarPorEmail(email);
    }

    async gravar(){
        const usuarioDao = new UsuarioDAO();
        return await usuarioDao.gravar(this);
    }
}