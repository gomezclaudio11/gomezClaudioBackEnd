import { loggerError } from "../config/logger.config.js"

export default class serviceFactory {

    constructor() {}

    get () {
        loggerError.error ("metodo get no creado")
    }
    post () {
        loggerError.error ("metodo post no creado")
    }
    put () {
        loggerError.error ("metodo put no creado")
    }
    delete () {
        loggerError.error ("metodo delete no creado")
    }
}