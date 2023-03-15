import { carritoDAO as Carrito } from "../daos/index.js"
import serviceFactory from "./serviceFactory.js";

export default class CarritoService extends serviceFactory{

    constructor (){
        this.dao = Carrito;
    }
async get  ()  {
    const data = await Carrito.getAll();
    return data;
};
async post (carritoId) {
    const data = await Carrito.create( { producto: [], carritoId: carritoId });
    return data;
};
async getCarritoById (carritoId)  {
    const data = await Carrito.getByField ("carritoId", carritoId);
    return data;
};
async delete (carritoId) {
    const carrito = await getCarritoById (carritoId);
    Carrito.deleteById (carrito._id);
    return carrito;
};
async addUserToCarrito (carritoId, usuario)  {
    const carrito = await getCarritoById(carritoId);
    const { name } = usuario;
    carrito.usuario.push ({ name });
    await Carrito.updateById(carrito._id, carrito);

    return carrito
};
}
