import MongoDbContainer  from "../containers/mongo.container.js";

class CarritoDaoMongoDb extends MongoDbContainer {
    constructor () {
        super ("carrito", {
            producto: { type: [], required: true},
            carritoId: { type: String}
        });
    }

    async create (carrito = { producto: []}) {
        return super.save(carrito)
    }
}

export default CarritoDaoMongoDb;