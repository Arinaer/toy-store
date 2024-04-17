import mongoose, {model} from 'mongoose';

export const categoryModel = model('Category', new mongoose.Schema({
    name: { type: String, required: true, min: 2, max: 80 },
    description: { type: String },
    photo: { type: String }
}));