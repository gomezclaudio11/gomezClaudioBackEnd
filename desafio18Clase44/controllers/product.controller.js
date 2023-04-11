import ProductService from "../service/product.service.js";
const ProductServices = new ProductService()

export const getAllProduct = async (req, res) => {
    console.log (req.user);
    const data = await ProductServices.getAllProducts();
    res.send(data)
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const data = await ProductServices.getProductById(id);
    if (!data) {
      res.send("Producto inexistente")
    } else {      
      res.send(data);
    }
};

export const postProduct = async (req, res) => {
    const data = await ProductServices.createProduct(req.body);
    res.send(data)
};

export const updateProduct = async (req, res) => {
    res.send(await DrinkService.updateProduct(req.body))
  }
  
  export const deleteProduct = async (req, res) => {
    const { id } = req.params
    res.send(await DrinkService.deleteProduct(id))
  }
  
  export const deleteAllProduct = async (req, res) => {
    res.send(await DrinkService.deleteAllProduct(req.body))
  }
  