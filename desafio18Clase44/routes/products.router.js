import { Router } from "express";
import * as ProductController from "../controllers/product.controller.js";

const ProductRouter = new Router();


ProductRouter.get ("/", ProductController.getAllProduct)
  .get("/:id", ProductController.getProductById)
  .post("/", ProductController.postProduct)
  .put("/", ProductController.updateProduct)
  .delete("/:id", ProductController.deleteProduct)
  .delete("/", ProductController.deleteAllProduct)
  
export default ProductRouter;
