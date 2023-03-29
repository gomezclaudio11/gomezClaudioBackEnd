import { Router } from "express";
import * as CarritoController from "../controllers/carrito.controllers.js";
const CarritoRouter = new Router();

CarritoRouter.get("/", CarritoController.getByLoggedUser)
    .post("/", CarritoController.createCarrito)
    .delete("/", CarritoController.deleteCarrito)
    .post("/:id", CarritoController.postDrinkToCarrito)
    .delete("/:id", CarritoController.deleteDrinkFromCarrito)

export default CarritoRouter;