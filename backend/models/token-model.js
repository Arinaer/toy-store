import mongoose, {model} from 'mongoose';

export const tokenModel = model('Token', new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
}));