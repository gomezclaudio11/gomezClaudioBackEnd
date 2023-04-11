import { mensajeDAO as Mensaje } from "../daos/index.js";
import serviceFactory from "./serviceFactory.js";

export default class MensajeService extends serviceFactory{

    constructor () {
        super()
        this.dao = Mensaje;
    }

    async getAllMensajes()  {
        const data = await this.dao.listarAll();
        return data;
    };
    
    async getMensajeById(id) {
        const data = await this.dao.listarById(id);
        return data;
    };
    
    async createMensaje(data)  {
        // const { name } = data;
        const res = await this.dao.guardar(data);
        return res;
    }
}
