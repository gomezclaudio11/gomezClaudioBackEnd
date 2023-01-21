import mongoose from 'mongoose'
import config from '../../config.js'

await mongoose.connect(config.mongodb.url, config.mongodb.options)

class ContenedorUsuarios {
    constructor(usuarios, usuarioSchema) {
    this.coleccion = mongoose.model(usuarios, usuarioSchema)
}
    async findOne(){
        try {
            let buscarUsuario = await this.coleccion.findOne({ username })
            return buscarUsuario
        } catch (error){
            throw new Error ("error")
        }
    }
}

export default ContenedorUsuarios