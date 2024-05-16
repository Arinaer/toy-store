import {Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import {adminMiddleware} from "../middlewares/admin-middleware.js";
import {
    deleteProduct,
    getProduct,
    getProducts,
    patchProduct,
    postProduct
} from "../controllers/productController.js";

const productRouter = Router();

productRouter.get('', getProducts);
productRouter.get('/:id', getProduct);
productRouter.post('', authMiddleware, adminMiddleware, postProduct);
productRouter.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);
productRouter.patch('/:id', authMiddleware, adminMiddleware, patchProduct);

export {productRouter}