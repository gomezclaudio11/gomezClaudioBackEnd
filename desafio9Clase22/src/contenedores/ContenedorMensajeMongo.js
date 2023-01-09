import mongoose from 'mongoose'


await mongoose.connect(config.mongodb.url, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema) 
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

export default ContenedorMongoDb