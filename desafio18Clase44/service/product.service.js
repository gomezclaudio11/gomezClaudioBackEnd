import {productsDAO as Product} from "../daos/index.js";
import serviceFactory from "./serviceFactory.js";

export default class ProductService extends serviceFactory{

    constructor () {
        super ()
        this.dao = Product;
    }
    async get ()  {
        const data = await this.dao.getAll();
        return data;
    };
    
    async getProductById (id) {
        const data = await this.dao.getById(id);
        return data;
    };
    
    async createProduct (data)  {
        const { title, price, description, thumbnail } = data;
        const res = await this.dao.save ({ title, price, description, thumbnail });
        return res;
    }
}