import MongoDbContainer from '../containers/mongo.container.js'
import MensajeSchema from '../models/mensaje.model.js'

class MensajeDaoMongoDb extends MongoDbContainer {
  constructor() {
    super('mensajes', MensajeSchema)
  }
}

export default MensajeDaoMongoDb