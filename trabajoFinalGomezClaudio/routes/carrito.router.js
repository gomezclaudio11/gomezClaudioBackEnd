import { Router } from "express";
import * as CarritoController from "../controllers/carrito.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const CarritoRouter = new Router();

CarritoRouter.get("/", isAuth, CarritoController.getByLoggedUser)
    .post("/", isAuth, CarritoController.createCarrito)
    .delete("/", isAuth, CarritoController.deleteCarrito)
    .post("/:id", isAuth, CarritoController.postDrinkToCarrito)
    .delete("/:id", isAuth, CarritoController.deleteDrinkFromCarrito)

export default CarritoRouter;