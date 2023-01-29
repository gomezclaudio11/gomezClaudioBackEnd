// importaciones de moongose y congiguracion
import mongoose from 'mongoose'
import config from '../../database/mongoConnection.js'

await mongoose.connect(config.mongodb.url, config.mongodb.options)

class ContenedorUsuarios {
    constructor(usuario, usuarioSchema) {
    this.coleccion = mongoose.model(usuario, usuarioSchema)
}

    async findOne (username){
        let buscarUsuario = await this.coleccion.findOne({ username: username})
        return buscarUsuario
    }

    async findById (id){
        let buscarUsuario = await this.coleccion.findOne ({ _id: id })
        return buscarUsuario
    }

    // REALIZAR: contenedorUsuarios tambien debe poder guardar un usuario, por lo que habra que crear el metodo para poder realizar esa accion
    async create( user ){
        try {
            let guardarUsuario = await this.coleccion.create ( {username: user.username} )
        } catch (error) {
            throw new Error (`error usuario no guardado ${error}`)
        }
    } 
}

export default ContenedorUsuarios