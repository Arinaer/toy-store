import { Router } from 'express';
import {categoryRouter} from "./categoryRoutes.js";
import {cartRouter} from "./cartRoutes.js";
import {productRouter} from "./productRoutes.js";
import {authRouter} from "./userRoutes.js";
import {subscriptionRouter} from "./subscriptionsRoutes.js";
import {orderRouter} from "./orderRoutes.js";

const router = Router();

router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/auth', authRouter);
router.use('/cart', cartRouter);
router.use('/subscriptions', subscriptionRouter);
router.use('/orders', orderRouter);

export {router};