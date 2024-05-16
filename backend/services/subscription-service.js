import {subscriptionModel} from "../models/subscription-model.js";


export const createSubscription = async ({ email }) => {
    const category = await subscriptionModel.create({email});
    category.save();
    return category;
};


export const removeSubscription = async (id) => {
    return await subscriptionModel.findByIdAndDelete(id);
}

export const receiveSubscriptions = async () => {
    return await subscriptionModel.find();
}