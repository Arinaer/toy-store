import {orderModel} from "../models/order-model.js";
export const createOrder = async ( userId, products, price ) => {
    const orders = await orderModel.create({ userId, products, price });
    await orders.save();
    return orders;
}

export const editOrder = async (userId, products, price) => {
    const orders = await orderModel.findOneAndUpdate({userId}, {products, price});
    return await orderModel.findOne({userId});
}

export const receiveOrders = async (userId) => {
    return await orderModel.find({userId});
}


