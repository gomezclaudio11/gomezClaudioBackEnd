import { Router } from "express";

const ProductRouter = new Router();

import * as ProductController from "../controllers/product.controller.js";

ProductRouter.get ("/", ProductController.getAllProduct)
  .get("/:id", ProductController.getProductById)
  .post("/", ProductController.postProduct);

export default ProductRouter;
