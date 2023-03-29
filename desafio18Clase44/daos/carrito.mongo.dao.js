import MongoDbContainer  from "../containers/mongo.container.js";
import CarritoSchema from "../models/carrito.model.js"

class CarritoDaoMongoDb extends MongoDbContainer {
    constructor () {
        super ("carrito", CarritoSchema);
    }

    async save (carrito = { producto: []}) {
        return super.save(carrito)
    }

    async deleteCarritoByUser (user) {
        try {
            const { n, nDeleted } = await this.model.deleteOne({ username: user })
            if (n == 0 || nDeleted == 0) {
              throw new Error('Error al borrar: no encontrado')
            }
          } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
          }
    }
}

export default CarritoDaoMongoDb;