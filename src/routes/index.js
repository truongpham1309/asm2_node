import { Router } from "express";
import routerProduct from "./products";
import routerAuth from "./auths";

const router = Router();

// Thêm các route vào đây
router.use("/products", routerProduct);
router.use("/auth", routerAuth)

export default router;
