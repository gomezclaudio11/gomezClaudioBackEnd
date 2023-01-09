import { text } from 'express';
import mongoose from 'mongoose'
import config from '../../config.js'

await mongoose.connect(config.mongodb.url, config.mongodb.options)

class ContenedorMensajeMongoDb {

    constructor(mensajes, mensajeSchema) {
        this.coleccion = mongoose.model(mensajes, mensajeSchema) 
    }
    async save(nuevoElemento) {
        try {
            let doc = await this.coleccion.create(nuevoElemento);
            return doc
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }
}

const mensajeSchema = new mongoose.Schema(
{ 
author:{
    id: Number,
    nombre: String,
    apellido: String,
    edad: Number,
    alias: String,
    avatar: String
},
text: String
}
)
const mensajeDAO = mongoose.model('mensaje', mensajeSchema)
await mensajeDAO.create({ author:{id: 2, nombre:"federico", apellido: "gonzalez", edad: 21, alias:"fede", avatar:"asdasd"}, text: "holaaa" })
console.log('usuario agregado!')
export default ContenedorMensajeMongoDb