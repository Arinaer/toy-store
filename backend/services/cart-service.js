import {cartModel} from "../models/cart-model.js";

export const createCart = async ( userId, products ) => {
    const cart = await cartModel.create({ userId, products });
    await cart.save();
    return cart;
}

export const editCart = async (userId, products) => {
    console.log(products)
    const cart = await cartModel.findOneAndUpdate({userId}, {products});
    return await cartModel.findOne({userId});
}

export const receiveCart = async (userId) => {
    const cart = await cartModel.findOne({userId});
    if (!cart) {
        return cartModel.create({userId, products: []});
    }
    return cart;
}


