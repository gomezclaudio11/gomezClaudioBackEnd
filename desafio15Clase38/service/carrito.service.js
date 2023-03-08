import CarritoDaoMongoDb from "../daos/carrito.mongo.dao.js";

export const getAllCarrito = async () => {
    const data = await CarritoDaoMongoDb.getAll();
    return data;
};

export const createCarrito = async (carritoId) =>{
    const data = await CarritoDaoMongoDb.create( { producto: [], carritoId: carritoId });
    return data;
};

export const getCarritoById = async (carritoId) => {
    const data = await CarritoDaoMongoDb.getByField ("carritoId", carritoId);
    return data;
};

export const deleteCarritoById = async (carritoId) =>{
    const carrito = await getCarritoById (carritoId);
    CarritoDaoMongoDb.deleteById (carrito._id);
    return carrito;
};

export const addUserToCarrito = async (carritoId, usuario) => {
    const carrito = await getCarritoById(carritoId);
    const { name } = usuario;
    carrito.usuario.push ({ name });
    await CarritoDaoMongoDb.updateById(carrito._id, carrito);

    return carrito
};

