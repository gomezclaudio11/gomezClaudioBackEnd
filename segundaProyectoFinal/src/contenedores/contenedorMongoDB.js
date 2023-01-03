import mongoose from 'mongoose'
import config from '../../config.js'

await mongoose.connect(config.mongodb.url, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema) 
    }


    
    async get(id) {
        try {
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 }) 
            return docs[0]
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async getAll() {
        try {
            let docs = await this.coleccion.find({}, { __v: 0 })
            return docs
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save(nuevoElemento) {
        try {
            let doc = await this.coleccion.create(nuevoElemento);
            return doc
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async update(nuevoElemento) {
        try {
            await this.coleccion.replaceOne({ '_id': nuevoElemento._id }, nuevoElemento)
            return nuevoElemento
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            await this.coleccion.deleteOne({ '_id': id })
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await this.coleccion.deleteMany({})
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}

export default ContenedorMongoDb