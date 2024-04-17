import {compare, hash} from "bcrypt";

import {generateTokens, saveToken, validateRefreshToken, findToken} from "./token-service.js";
import {ApiError} from "../utils/api-error.js";
import {UserDTO} from "../dtos/user-dto.js";

import {userModel} from "../models/user-model.js";
import {tokenModel} from "../models/token-model.js";



export async function register ({email, password, name}) {
    const candidate = await userModel.findOne({ email });

    if (candidate) {
        throw ApiError.BadRequest('Пользователь с такой почтой уже существует');
    }

    const hashedPassword = await hash(password, 12);

    const user = await userModel.create({
        email, name, password: hashedPassword,
    });

    const userDTO = new UserDTO(user);
    const tokens = generateTokens({...userDTO});

    await saveToken(userDTO._id.toString(), tokens.refreshToken);

    return {
        ...tokens,
        user: userDTO
    }
}

export async function login ({email, password}) {
    const user = await userModel.findOne({ email });

    if (!user) {
        throw ApiError.BadRequest('Неверный логин или пароль');
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
        throw ApiError.BadRequest('Неверный логин или пароль');
    }

    const userDTO = new UserDTO(user);
    const tokens = generateTokens({...userDTO});
    await saveToken(userDTO._id.toString(), tokens.refreshToken);

    return { ...tokens, user: userDTO }
}

export async function logout (refreshToken) {
    return tokenModel.deleteOne({refreshToken});
}

export async function refresh (refreshToken) {
    if (!refreshToken) {
        throw ApiError.UnauthorizedError();
    }

    const userData = validateRefreshToken(refreshToken);
    const tokenFromDB = await findToken(refreshToken);
    if (!userData || !tokenFromDB) {
        throw ApiError.UnauthorizedError();
    }

    const user = await userModel.findById(userData._id);
    if (!user) {
        throw ApiError.UnauthorizedError();
    }

    const userDTO = new UserDTO(user);
    const tokens = generateTokens({...userDTO});
    await saveToken(userDTO._id.toString(), tokens.refreshToken);
    return { ...tokens, user: userDTO }
}

export const isAdmin = async (userId) => {
    const user = await userModel.findById(userId);
    return user.role.includes('admin');
}