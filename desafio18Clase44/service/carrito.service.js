import { carritoDAO, productsDAO} from "../daos/index.js"
import serviceFactory from "./serviceFactory.js";

export default class CarritoService extends serviceFactory{

    constructor (){
        super()
        this.carritoDao = carritoDAO;
        this.productsDao = productsDAO; 
    }

async getCarritoById (user)  {
    const data = await this.carritoDao.getByField ("carritoId", user);
    return data;
};
async get  ()  {
    const data = await this.carritoDao.getAll();
    return data;
};
async post (carritoId) {
    const data = await this.carritoDao.create( { producto: [], carritoId: carritoId });
    return data;
};

async delete (carritoId) {
    const carrito = await getCarritoById (carritoId);
    this.carritoDao.deleteById (carrito._id);
    return carrito;
};
async addUserToCarrito (carritoId, usuario)  {
    const carrito = await getCarritoById(carritoId);
    const { name } = usuario;
    carrito.usuario.push ({ name });
    await this.carritoDao.updateById(carrito._id, carrito);

    return carrito
};
}
