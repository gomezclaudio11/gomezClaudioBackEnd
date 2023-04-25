import CarritoFactory from "../service/carrito.service.js";
const CarritoService = new CarritoFactory()

export const getByLoggedUser = async (req, res) => {
  const username = req.user.username  
  const pedido = await CarritoService.getCarritoById(username);
  if (pedido)  
  res.send(pedido)
  else
  res.send([])
};

export const createCarrito = async (req, res) => {
    const data = await CarritoService.createCarrito(req.user._id);
    //req.session.boxId = data._id;
    // * req.session.save();
    res.send(data);
};

export const deleteCarrito = async (req, res) => {
  const username = req.user.username  
  const data = await CarritoService.deletePedidoByUser(username)
    res.send(data)
  }
  
  export const postProductToCarrito = async (req, res) => {
    const { id } = req.params
    const username = req.user.username
    const data = await CarritoService.addDrinkToPedido(username)
    res.send(data)
  }
  
  export const deleteProductFromCarrito = async (req, res) => {
    const { id } = req.params
    const username = req.user.username
    const data = await CarritoService.deleteDrinkFromPedido(username)
   // req.session.boxId = data.username //?
    // * req.session.save();
    res.send(data)
  }
  