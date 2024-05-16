
import {validateAccessToken} from "../services/token-service.js";
import {createOrder, receiveOrders} from "../services/orders-service.js";


export async function postOrder (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const userData = validateAccessToken(token);
        const {products, price} = req.body;
        const order = await createOrder(userData._id, products, price);
        return res.status(200).json(order);
    } catch (e) {
        next(e);
    }
}

export async function getOrders (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const userData = validateAccessToken(token);
        const cart = await receiveOrders(userData._id);
        return res.status(200).json(cart);
    } catch (e) {
        next(e);
    }
}


