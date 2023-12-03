import { Router } from "express";
import { registerAuth } from "../controllers/auths_controller";

const routerAuth = Router();

routerAuth.post("/register", registerAuth);
routerAuth.post("/login", )

export default routerAuth;