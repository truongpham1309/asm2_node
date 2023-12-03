import { Router } from "express";
import { createProducts, getAllProducts, getDetailProduct, removeProduct, updateProducts } from "../controllers/products_controller";

const routerProduct = Router();

routerProduct.get('/', getAllProducts);
routerProduct.get("/:id", getDetailProduct);
routerProduct.post("/", createProducts);
routerProduct.put("/:id", updateProducts);
routerProduct.delete("/", removeProduct);

export default routerProduct;