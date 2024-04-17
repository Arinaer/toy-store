import {Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware.js";

import {getCart, postCart} from "../controllers/cartController.js";


const cartRouter = Router();

cartRouter.post('/', authMiddleware, postCart);
cartRouter.get('/', authMiddleware, getCart);

export {cartRouter}