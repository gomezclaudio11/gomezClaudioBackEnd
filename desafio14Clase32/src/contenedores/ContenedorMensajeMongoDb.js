// importacion de moongose
import mongoose from 'mongoose'
// importacion de la configuracion de conexion de mongo
import config from '../../database/mongoConnection.js'
//log4js
import { logError } from '../../logger/logger.js'

// se conecta a la db...
await mongoose.connect(config.mongodb.url, config.mongodb.options)


class ContenedorMensajeMongoDb {

    constructor(mensaje, mensajeSchema) {
        this.coleccion = mongoose.model(mensaje, mensajeSchema) 
    }
    async save(nuevoElemento) {
        try {
            let doc = await this.coleccion.create(nuevoElemento);
            return doc
        } catch (error) {
            logError.error(error)
        }
    }

    async getAll(){
        try {
            let docs = await this.coleccion.find({}, { __v: 0 })
            return docs
        } catch (error) {
            logError.error(error)
        }
    }
}


export default ContenedorMensajeMongoDb