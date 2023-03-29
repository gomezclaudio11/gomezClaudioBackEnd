export default class serviceFactory {

    constructor() {}

    get () {
        throw new Error ("metodo get no creado")
    }
    post () {
        throw new Error ("metodo post no creado")
    }
    put () {
        throw new Error ("metodo put no creado")
    }
    delete () {
        throw new Error ("metodo delete no creado")
    }
}