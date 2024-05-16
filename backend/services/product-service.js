import {productModel} from "../models/product-model.js";

export const createProduct = async ({ categoryId, name, description, price, photos }) => {
    const product = await productModel.create({ categoryId, name, description , price, photos });
    product.save();
    return product;
}

export const editProduct = async (id, { categoryId, name, description, variants }) => {
    const product = await productModel.findByIdAndUpdate(id, { categoryId, name, description, price, photos }, { new: true });
    return product;
}

export const removeProduct = async (id) => {
    const product = await productModel.findByIdAndDelete(id);
    return product;
}

export const receiveProduct = async (id) => {
    const product = await productModel.findById(id);
    return product;
}

export const receiveProducts = async (params) => {
    console.log(params)
    const query = {}
    if (params.categoryId && params.categoryId !== 'undefined') {
        query.categoryId = params.categoryId
    }
    if (params.minPrice !== undefined) {
        query.price = { $gte: parseInt(params.minPrice) };
    }

    if (params.maxPrice !== undefined) {
        query.price = { ...query.price, $lte: parseInt(params.maxPrice) };
    }
    if (params.name && params.name !== 'null' && params.name.length > 0) {
        query.name = {
            $regex: params.name,
            $options: 'i'
        }
    }

    return productModel.find(query);
}
