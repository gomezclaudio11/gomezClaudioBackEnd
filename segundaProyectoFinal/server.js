import  express from "express";
const app = express()
const { Router } = express

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//administradores
const esAdmin = true

function soloAdministradores(req, res, next) {
    if (!esAdmin) {
        res.json({ message: 'Usuario no autorizado' })
    } else {
        next()
    }
}

//router
const productosRouter = new Router()
const carritosRouter = new Router()
app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

import ProductosDaoMongoDb from './src/daos/productos/productoDaoMongoDB.js'  
import CarritosDaoMongoDb from './src/daos/carritos/carritosDaoMongoDB.js'

const productosDao = new ProductosDaoMongoDb() // se instancia el DAO de productos
const carritosDao = new CarritosDaoMongoDb() 

// ROUTER DE PRODUCTOS
// Manejo de productos
productosRouter.get('/', async (req, res) => {
    const productos = await productosDao.getAll()
    res.json(productos)
})

// Obtener un producto por id
productosRouter.get('/:id', async (req, res) => {
    res.json(await productosDao.get(req.params.id))
})

// Crear un nuevo producto
productosRouter.post('/', soloAdministradores, async (req, res) => {
    res.json(await productosDao.save(req.body))
})

// Actualizar un producto
productosRouter.put('/:id', soloAdministradores, async (req, res) => {
    res.json(await productosDao.update(req.body))
})

// Borrar un producto
productosRouter.delete('/:id', soloAdministradores, async (req, res) => {
    res.json(await productosDao.deleteById(req.params.id))
})

// ROUTER DE CARRITOS
// Manejo de carritos

// Obtener todos los carritos creados
carritosRouter.get('/', async (req, res) => {
    res.json((await carritosDao.getAll()).map(carrito => carrito.id))
})

// Crear un nuevo producto (vacio)
carritosRouter.post('/', async (req, res) => {
    res.json(await carritosDao.save())
})

// Borrar un carrito por su id
carritosRouter.delete('/:id', async (req, res) => {
    res.json(await carritosDao.deleteById(req.params.id))
})
// Manejo de productos de carritos

// Obtener los productos de un carrito - (:id = id del carrito)
carritosRouter.get('/:id/productos', async (req, res) => {
    const carrito = await carritosDao.get(req.params.id)
    res.json(carrito.productos)
})

// Agregar un producto al carrito - (:id = id del carrito - id del producto por body)
carritosRouter.post('/:id/productos', async (req, res) => {
    const carrito = await carritosDao.get(req.params.id)
    const producto = await productosDao.get(req.body.id)
    carrito.productos.push(producto)
    await carritosDao.update(carrito)
    res.end()
})

// Borrar un producto del carrito - (:id = id del carrito - :idProd = id del producto)
carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
    const carrito = await carritosDao.get(req.params.id)
    const index = carrito.productos.findIndex(p => p._id == req.params.idProd)
    if (index != -1) {
        carrito.productos.splice(index, 1)
        await carritosDao.update(carrito)
    }
    res.end()
})

//server
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))

