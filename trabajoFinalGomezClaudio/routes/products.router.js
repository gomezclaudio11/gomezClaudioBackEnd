import { Router } from "express";
import * as ProductController from "../controllers/product.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const ProductRouter = new Router();


ProductRouter.get ("/", isAuth, ProductController.getAllProduct)
  .get("/:id", isAuth, ProductController.getProductById)
  .post("/", isAuth, ProductController.postProduct)
  .put("/", isAuth, ProductController.updateProduct)
  .delete("/:id", isAuth, ProductController.deleteProduct)
  .delete("/", isAuth, ProductController.deleteAllProduct)
  
export default ProductRouter;
