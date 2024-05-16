import {categoryModel} from "../models/category-model.js";


export const createCategory = async ({ name, description, photo }) => {
    const category = await categoryModel.create({ name, description, photo });
    category.save();
    return category;
};

export const editCategory = async (id, { name, description, photo }) => {
    const category = await categoryModel.findByIdAndUpdate(id, { name, description, photo }, { new: true });
    return category;
}

export const removeCategory = async (id) => {
    const category = await categoryModel.findByIdAndDelete(id);
    return category;
}

export const receiveCategory = async (id) => {
    const category = await categoryModel.findById(id);
    return category;
}

export const receiveCategories = async () => {
    const categories = await categoryModel.find();
    return categories;
}