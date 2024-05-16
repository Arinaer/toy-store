import mongoose, {model} from 'mongoose';
import {productSchema} from "./product-model.js";

export const cartModel = model('Cart', new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
    products: [productSchema]
}));