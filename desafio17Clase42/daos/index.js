import dotenv from "dotenv";
dotenv.config();

export default class DAOFactory {
    async getProductDAO () {
        const { default: ProductDaoMongoDb } = await import (
            "./product.mongo.dao.js"
        );
        return new ProductDaoMongoDb ();
    } 
    
    async getCarritoDAO () {
        const { default: CarritoDaoMongoDb } = await import (
            "./carrito.mongo.dao"
            );
            return new CarritoDaoMongoDb ();
        }

        async getDAOs (){
            return {
                productsDAO: this.getProductDAO(),
                carritoDAO: this.getCarritoDAO()
            }
        }
    }

    const DAOS = new DAOFactory ();
    DAOS.getProductDAO();
    DAOS.getCarritoDAO();
    DAOS.getDAOs();
    const { productDAO, carritoDAO } = DAOS.getDAOs()