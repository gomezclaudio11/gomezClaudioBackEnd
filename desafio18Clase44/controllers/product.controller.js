import ProductService from "../service/product.service.js";
const ProductServices = new ProductService()

export const getAllProduct = async (req, res) => {
    console.log (req.user);
    const data = await ProductServices.get();
    res.send(data)
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const data = await ProductServices.getProductById(id);
    res.send(data);
};

export const postProduct = async (req, res) => {
    const data = await ProductServices.create(req.body);
    res.send(data)
}