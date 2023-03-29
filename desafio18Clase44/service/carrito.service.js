import { carritoDAO as Carrito } from "../daos/index.js"
import serviceFactory from "./serviceFactory.js";

export default class CarritoService extends serviceFactory{

    constructor (){
        super()
        this.dao = Carrito;
    }
async get  ()  {
    const data = await this.dao.getAll();
    return data;
};
async post (carritoId) {
    const data = await this.dao.create( { producto: [], carritoId: carritoId });
    return data;
};
async getCarritoById (carritoId)  {
    const data = await this.dao.getByField ("carritoId", carritoId);
    return data;
};
async delete (carritoId) {
    const carrito = await getCarritoById (carritoId);
    this.dao.deleteById (carrito._id);
    return carrito;
};
async addUserToCarrito (carritoId, usuario)  {
    const carrito = await getCarritoById(carritoId);
    const { name } = usuario;
    carrito.usuario.push ({ name });
    await this.dao.updateById(carrito._id, carrito);

    return carrito
};
}
