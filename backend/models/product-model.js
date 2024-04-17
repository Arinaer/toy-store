import mongoose, {model} from 'mongoose';

export const productModel = model('Product', new mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" , required: true },
    name: { type: String, required: true, min: 2, max: 80 },
    description: { type: String },
    photos: { type: [String]},
    price: { type: Number, required: true }
}));