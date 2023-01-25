// importaciones de moongose y congiguracion
import mongoose from 'mongoose'
import config from '../../database/mongoConnection.js'

await mongoose.connect(config.mongodb.url, config.mongodb.options)

class ContenedorUsuarios {
    constructor(usuario, usuarioSchema) {
    this.coleccion = mongoose.model(usuario, usuarioSchema)
}
    async findOne(){
        
            let buscarUsuario = await this.coleccion.findOne({ username })
            return buscarUsuario
        
    }

    // REALIZAR: contenedorUsuarios tambien debe poder guardar un usuario, por lo que habra que crear el metodo para poder realizar esa accion
    async create( nuevoUsuario ){
        try {
            let guardarUsuario = await this.coleccion.create ( nuevoUsuario )
        } catch (error) {
            throw new Error ("error usuario no guardado")
        }
    } 
}

export default ContenedorUsuarios