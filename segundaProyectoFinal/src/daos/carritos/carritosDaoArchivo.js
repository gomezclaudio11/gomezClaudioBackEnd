
const express = require('express')
const { Router } = express

const app = express()

const ContenedorArchivo = require("../../contenedores/contenedorArchivo");

const contenedorCarritos = new ContenedorArchivo()


const carritosRouter = new Router();
app.use('/api/carritos', carritosRouter)

carritosRouter.get('/', async (req, res) => {
    res.json((await contenedorCarritos.getAll()).map(c => c.id))
})

carritosRouter.post('/', async (req, res) => {
    res.json({ id: await contenedorCarritos.save({ productos: [] }) })
})

carritosRouter.delete('/:id', async (req, res) => {
    res.json(await contenedorCarritos.deleteById(req.params.id))
})

carritosRouter.get('/:id/productos', async (req, res) => {
    const carrito = await contenedorCarritos.getById(req.params.id)
    res.json(carrito.productos)
})

carritosRouter.post('/:id/productos', async (req, res) => {
    const carrito = await contenedorCarritos.getById(req.params.id)
    const producto = await contenedorProductos.getById(req.body.id)
    carrito.productos.push(producto)
    await contenedorCarritos.update(carrito, req.params.id)
    res.end()
})

carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
    const carrito = await contenedorCarritos.getById(req.params.id)
    const index = carrito.productos.findIndex(p => p.id == req.params.idProd)
    if (index != -1) {
        carrito.productos.splice(index, 1)
        await contenedorCarritos.update(carrito, req.params.id)
    }
    res.end()
})
