import {Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import {getOrders, postOrder} from "../controllers/orderController.js";


const orderRouter = Router();

orderRouter.post('/', authMiddleware, postOrder);
orderRouter.get('/', authMiddleware, getOrders);

export {orderRouter}