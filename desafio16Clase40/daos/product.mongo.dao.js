import MongoDbContainer from "../containers/mongo.container.js";

class ProductDaoMongoDb extends MongoDbContainer {
    constructor() {
        super ("producto", {
            name: { type: String, required: true},
            
        });
    }
}

export default ProductDaoMongoDb;