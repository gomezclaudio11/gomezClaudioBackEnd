import MongoDbContainer  from "../containers/mongo.container.js";
import CarritoSchema from "../models/carrito.model.js"
import { loggerError } from "../config/logger.config.js";

class CarritoDaoMongoDb extends MongoDbContainer {
    constructor () {
        super ("carritos", CarritoSchema);
    }

    async save (carrito = { productos: []}) {
        return super.save(carrito)
    }

    async deleteCarritoByUser (user) {
        try {
            const { n, nDeleted } = await this.coleccion.deleteOne({ username: user })
            if (n == 0 || nDeleted == 0) {
              throw new Error('Error al borrar: no encontrado')
            }
          } catch (error) {
            loggerError.error(`Error al borrar: ${error}`)
          }
    }
}

export default CarritoDaoMongoDb;