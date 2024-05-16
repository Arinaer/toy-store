import {Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import {adminMiddleware} from "../middlewares/admin-middleware.js";
import {deleteSubscription, getSubscription, postSubscription} from "../controllers/subscriptionController.js";

const subscriptionRouter = Router();

subscriptionRouter.get('', getSubscription);
subscriptionRouter.post('', postSubscription);
subscriptionRouter.delete('/:id', authMiddleware, adminMiddleware, deleteSubscription);

export {subscriptionRouter}