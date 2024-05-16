import {validationResult} from "express-validator";
import {ApiError} from "../utils/api-error.js";
import {createSubscription, receiveSubscriptions, removeSubscription} from "../services/subscription-service.js";


export async function postSubscription (req, res, next) {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка валидации', validationErrors.array()));
        }
        const subscription = await createSubscription(req.body);
        return res.status(200).json(subscription);
    } catch (e) {
        next(e);
    }
}

export async function deleteSubscription (req, res, next) {
    try {
        const subscriptionId = req.params.id;
        const subscription = await removeSubscription(subscriptionId);
        return res.status(200).json(subscription);
    } catch (e) {
        next(e);
    }
}

export async function getSubscription (req, res, next) {
    try {
        const subscriptions = await receiveSubscriptions();
        return res.status(200).json(subscriptions);
    } catch (e) {
        next(e);
    }
}