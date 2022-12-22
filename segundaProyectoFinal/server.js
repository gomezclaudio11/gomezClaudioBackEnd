const express = require('express')
const app = express()
const { Router } = express

const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//router
const productosRouter = new Router()
const carritosRouter = new Router()
app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))

module.exports = app