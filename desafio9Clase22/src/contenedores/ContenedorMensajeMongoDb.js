import { text } from 'express';
import mongoose from 'mongoose'
import config from '../../config.js'

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
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async getAll(){
        try {
            let docs = await this.coleccion.find({}, { __v: 0 })
            return docs
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }
}


export default ContenedorMensajeMongoDb