import MongoDbContainer from '../containers/mongo.container.js'
import { UserSchema, UserCollection } from '../models/usuario.model.js'

class UsuarioDaoMongoDb extends MongoDbContainer {
  constructor() {
    super(UserCollection, UserSchema)
  }
}

export default UsuarioDaoMongoDb