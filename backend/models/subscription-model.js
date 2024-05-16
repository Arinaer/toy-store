import mongoose, {model} from 'mongoose';

export const subscriptionModel = model('Subscriptions', new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
    email: { type: String, required: true }
}));