import { Router } from 'express';
import {categoryRouter} from "./categoryRoutes.js";
import {cartRouter} from "./cartRoutes.js";
import {productRouter} from "./productRoutes.js";
import {authRouter} from "./userRoutes.js";

const router = Router();

router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/auth', authRouter);
router.use('/cart', cartRouter);

export {router};