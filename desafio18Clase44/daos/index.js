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
            "./carrito.mongo.dao.js"
            );
            return new CarritoDaoMongoDb ();
        }

    async getUserDAO () {
        const { default: UsuarioDaoMongoDb } = await import (
            "./usuario.mongo.dao.js"
        );
        return new UsuarioDaoMongoDb ();
    }

        async getDAOs (){
            return {
                productsDAO: this.getProductDAO(),
                carritoDAO: this.getCarritoDAO(),
                userDAO: this.getUserDAO()
            }
        }
        
    }

    const DAOS = new DAOFactory ();
    DAOS.getProductDAO();
    DAOS.getCarritoDAO();
    DAOS.getUserDAO();
    DAOS.getDAOs();
    const { productsDAO, carritoDAO, userDAO } = DAOS.getDAOs()
    
    export { productsDAO, carritoDAO, userDAO } 