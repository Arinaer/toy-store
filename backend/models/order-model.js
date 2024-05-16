import mongoose, {model} from 'mongoose';
import {productSchema} from "./product-model.js";

export const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
    products: [productSchema],
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now }
})

export const orderModel = model('Order', orderSchema);