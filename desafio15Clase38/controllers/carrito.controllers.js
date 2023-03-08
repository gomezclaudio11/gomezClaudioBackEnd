import * as CarritoService from "../service/carrito.service.js";

export const getByLoggedUser = async (req, res) => {
    const data = await CarritoService.getCarritoById(req.user._id);
    res.send(data)
};

export const createCarrito = async (req, res) => {
    const data = await CarritoService.createCarrito(req.user._id);
    req.session.boxId = data._id;
    // * req.session.save();
    res.send(data);
};

export const deleteUserCarrito = async (req,res) => {
    const data = await CarritoService.deleteCarritoById(req.user._id);
    res.send(data)
};

export const addUsertoCarrito = async (req, res) => {
    const { type } = req.params;
    const { body } = req.body;

    if (type == "remove") {
    } else {
        const data = await CarritoService.addUserToCarrito(req.user._id, req.body)
    }
    res.send(data)
};