import {Router} from "express";
import {body} from "express-validator";
import {login, logout, refresh, register} from "../controllers/userController.js";

const authRouter = Router();

authRouter.post(
    '/register',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/refresh', refresh);

export {authRouter}