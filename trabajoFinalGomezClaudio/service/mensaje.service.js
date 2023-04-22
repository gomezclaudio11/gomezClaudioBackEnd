import { mensajeDAO as Mensaje } from "../daos/index.js";
import serviceFactory from "./serviceFactory.js";

export default class MensajeService extends serviceFactory{

    constructor () {
        super()
        this.dao = Mensaje;
    }

    async getAllMensajes()  {
        const data = await this.dao.getAll();
        return data;
    };
    
    async getMensajeById(id) {
        const data = await this.dao.getById(id);
        return data;
    };
    
    async createMensaje(data)  {
        // const { name } = data;
        const res = await this.dao.save(data);
        return res;
    }
}
