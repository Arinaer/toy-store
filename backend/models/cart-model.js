import mongoose, {model} from 'mongoose';

export const cartModel = model('Cart', new mongoose.Schema({
    personId: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
}));