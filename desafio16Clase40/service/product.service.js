import {productDAO as Product} from "../daos/index.js";
import serviceFactory from "./serviceFactory.js";

export default class ProductService extends serviceFactory{

    constructor (){
        this.dao = Product;
    }
    async get ()  {
        const data = await Product.getAll();
        return data;
    };
    
    async getProductById (id) {
        const data = await Product.getById(id);
        return data;
    };
    
    async create (data)  {
        const { name } = data;
        const res = await Product.save ({ name });
        return res;
    }
}