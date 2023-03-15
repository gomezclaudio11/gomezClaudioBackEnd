import { Router } from "express";
import * as CarritoController from "../controllers/carrito.controllers.js";
const CarritoRouter = new Router();

CarritoRouter.get("/", CarritoController.getByLoggedUser)
    .post("/", CarritoController.createCarrito)
    .delete("/", CarritoController.deleteUserCarrito)
    .put("/:type", CarritoController.addUsertoCarrito);

export default CarritoRouter;