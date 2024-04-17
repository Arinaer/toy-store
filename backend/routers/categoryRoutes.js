import {Router} from "express";
import {deleteCategory, getCategories, getCategory, postCategory, putCategory} from "../controllers/categoryController.js";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import {adminMiddleware} from "../middlewares/admin-middleware.js";

const categoryRouter = Router();

categoryRouter.get('', getCategories);
categoryRouter.get('/:id', getCategory);
categoryRouter.post('', authMiddleware, adminMiddleware, postCategory);
categoryRouter.patch('/:id', authMiddleware, adminMiddleware, putCategory);
categoryRouter.delete('/:id', authMiddleware, adminMiddleware, deleteCategory);

export {categoryRouter}