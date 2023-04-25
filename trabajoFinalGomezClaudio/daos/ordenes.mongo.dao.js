import MongoDbContainer from "../containers/mongo.container.js";
import OrdenesSchema from "../models/ordenes.model.js"

class OrdenesDaoMongoDb extends MongoDbContainer {
    constructor() {
        super ("ordenes", OrdenesSchema);
    }
}

export default OrdenesDaoMongoDb;