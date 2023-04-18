import dotenv from "dotenv";
import { PERSISTENCIA } from '../config/persistence.config.js'

dotenv.config();


    let productsDAO, carritoDAO, usuarioDAO, mensajeDAO

    switch (PERSISTENCIA) {
        case 'mongodb':   
     /* Importaciones dinamicas */
     const { default: ProductDaoMongoDb } = await import('./product.mongo.dao.js')
     const { default: CarritoDaoMongoDb } = await import('./carrito.mongo.dao.js')
     const { default: UsuarioDaoMongoDb } = await import('./usuario.mongo.dao.js')
     const { default: MensajeDaoMongoDb } = await import('./mensaje.mongo.dao.js')
 
     /* Instanciaciones de daos */
     productsDAO = new ProductDaoMongoDb()
     carritoDAO = new CarritoDaoMongoDb()
     usuarioDAO = new UsuarioDaoMongoDb()
     mensajeDAO = new MensajeDaoMongoDb()

    }
 /* EXPORT */
 export { productsDAO, carritoDAO, usuarioDAO, mensajeDAO }
    