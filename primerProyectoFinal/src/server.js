//importaciones
const express = require('express');
const { Router } = express

const ContenedorArchivo = require ("./ContenedorArchivo.js")

//inicio servidor y permanencia de archivos
const app = express();

const contenedorProductos = new ContenedorArchivo("./persistencia/archivoProductos.json")
const contenedorCarritos = new ContenedorArchivo('./persistencia/archivoCarritos.json')

//config del servidor
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`);
})

app.on('error', (error) => {
  console.log("Error 404")
})
;

//ROUTER
const productosRouter = new Router();
const carritosRouter = new Router();
app.use('/api/products', esAdministrador, productosRouter);
app.use("/api/carrito", esAdministrador, carritosRouter)

//permiso de adminstrador
const esAdmin = true
function esAdministrador  (req, res, next)  {
  if(!esAdmin){
    res.json({
      error: "ruta no especifica"
    }).status(404);
  } else {
    next();
  }
} 

//rutas de productos

productosRouter.get("/", async (req, res)=>{
  const productos = await contenedorProductos.getAll()
  res.json(productos)
})

productosRouter.get("/:id", async (req, res)=> {
  res.json(await contenedorProductos.getById(req.params.id))
})

productosRouter.post ("/", esAdministrador, async (req, res) =>{
  res.json({ id: await contenedorProductos.save(req.body) })
})

productosRouter.put('/:id', esAdministrador, async (req, res) => {
  res.json(await contenedorProductos.update(req.body, req.params.id))
})
