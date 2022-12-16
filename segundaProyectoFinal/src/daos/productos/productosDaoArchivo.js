
const express = require('express')
const { Router } = express

const app = express()
const ContenedorArchivo = require("../../contenedores/contenedorArchivo");

const contenedorProductos = new ContenedorArchivo();//donde hiria la persistencia?

const productosRouter = new Router();
app.use('/api/productos', productosRouter)

productosRouter.get('/', async (req, res) => {
    const productos = await contenedorProductos.getAll()
    res.json(productos)
})

productosRouter.get('/:id', async (req, res) => {
    res.json(await contenedorProductos.getById(req.params.id))
})

productosRouter.post('/', async (req, res) => {
    res.json({ id: await contenedorProductos.save(req.body) })
})

productosRouter.put('/:id', async (req, res) => {
    res.json(await contenedorProductos.update(req.body, req.params.id))
})

productosRouter.delete('/:id', async (req, res) => {
    res.json(await contenedorProductos.deleteById(req.params.id))
})