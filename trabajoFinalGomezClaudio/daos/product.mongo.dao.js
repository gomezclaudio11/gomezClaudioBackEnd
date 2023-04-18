import MongoDbContainer from "../containers/mongo.container.js";
import ProductSchema from "../models/product.model.js"

class ProductDaoMongoDb extends MongoDbContainer {
    constructor() {
        super ("producto", ProductSchema);
    }
}

export default ProductDaoMongoDb;