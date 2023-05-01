import { carritoDAO, productsDAO} from "../daos/index.js"
import serviceFactory from "./serviceFactory.js";

export default class CarritoService extends serviceFactory{

    constructor (){
        super()
        this.carritoDao = carritoDAO;
        this.productsDao = productsDAO; 
    }

async getCarritoByUser (username)  {
    return await this.carritoDao.getByField ("username", username);
};

async createCarrito  (user)  {
    return await this.carritoDao.save({ username: user, product: [] })
};

async deleteCarritoByUser (user) {
    this.carritoDao.deleteCarritoByUser(user)
};

async addProductToCarrito (username, idProduct)  {
   let carrito = await this.carritoDao.getByField("username", username)
   if(!carrito){
    carrito = await this.carritoDao.save({ username: username, productos: []})
   }
   const product = await this.productsDao.getById(idProduct)
   if (product) {
    carrito.productos.push(product)
    await this.carritoDao.actualizar(carrito)
    return idProduct
}
return idProduct
};

async deleteProductFromCarrito (username, idProduct) {
    const carrito = await this.carritoDao.getByField("username", username)
    if (carrito && carrito != []){
        const index = carrito.productos.findIndex((p) => p.id == idProduct)
        if (index != -1) {
            carrito.productos.splice(index, 1)
            await this.carritoDao.actualizar(carrito)
        }
    }
    return idProduct
}
}
