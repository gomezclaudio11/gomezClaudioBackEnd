import CarritoFactory from "../service/carrito.service.js";
const CarritoService = new CarritoFactory()

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

export const deleteCarrito = async (req, res) => {
    // const data = await PedidoService.deletePedidoByUser(req.user.username);
    const data = await CarritoService.deletePedidoByUser(req.user._id)
    res.send(data)
  }
  
  export const postDrinkToCarrito = async (req, res) => {
    const { id } = req.params
    // const data = await PedidoService.addDrinkToPedido(id, req.user.username);
    const data = await CarritoService.addDrinkToPedido(req.user._id)
    res.send(data)
  }
  
  export const deleteDrinkFromCarrito = async (req, res) => {
    const { id } = req.params
    // const data = await PedidoService.deleteDrinkFromPedido(id, req.user.username);
    const data = await CarritoService.deleteDrinkFromPedido(req.user._id)
    req.session.boxId = data.username //?
    // * req.session.save();
    res.send(data)
  }
  