import ProductDaoMongoDb from "../daos/product.mongo.dao.js";

export const getAllProduct = async () => {
    const data = await ProductDaoMongoDb.getAll();
    return data;
};

export const getProductById = async (id) => {
    const data = await ProductDaoMongoDb.getById(id);
    return data;
};

export const createProduct = async (data) => {
    const { name } = data;
    const res = await ProductDaoMongoDb.save ({ name });
    return res;
}