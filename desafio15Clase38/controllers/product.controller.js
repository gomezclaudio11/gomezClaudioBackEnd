import * as ProductService from "../service/product.service.js";

export const getAllProduct = async (req, res) => {
    console.log (req.user);
    const data = await ProductService.getAllProduct();
    res.send(data)
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const data = await ProductService.getProductById(id);
    res.send(data);
};

export const postProduct = async (req, res) => {
    const data = await ProductService.createProduct(req.body);
    res.send(data)
}