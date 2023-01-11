import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import { Server, Socket} from 'socket.io'
import productRouter from "./src/routers/products.js"
import messagesRouter from "./src/routers/messages.js"
const app = express()
const server = http.Server(app)

const mensajeSchema = new mongoose.Schema(
  { 
  author:{
      id: String,
      nombre: String,
      apellido: String,
      edad: Number,
      alias: String,
      avatar: String
  },
  text: String
  }
  )
  const mensajeDAO = mongoose.model('mensaje', mensajeSchema)
  await mensajeDAO.create({ author:{id: 2, nombre:"federico", apellido: "gonzalez", edad: 21, alias:"fede", avatar:"asdasd"}, text: "holaaa" })
  console.log('usuario agregado!')

import ContenedorMensajeMongoDb from './src/contenedores/ContenedorMensajeMongoDb.js'
const contenedorMensajeMongo = new ContenedorMensajeMongoDb ("mensaje", mensajeSchema)



const io = new Server(server)
io.on('connection', async (socket) => {
    console.log('socket id: ', socket.id);
  
    socket.emit('products', await productContenedorSQL.getAll());
    
    socket.emit('conversation',await contenedorMensajeMongo.getAll());
    socket.on('new-message', async newMessage => {
    console.log({newMessage});
    await contenedorMensajeMongo.save(newMessage);
    io.sockets.emit('conversation', await contenedorMensajeMongo.getAll());
    });
  });

  const messages = [
    { 
      author: {
          id: 'mail del usuario', 
          nombre: 'nombre del usuario', 
          apellido: 'apellido del usuario', 
          edad: 'edad del usuario', 
          alias: 'alias del usuario',
          avatar: 'url avatar (foto, logo) del usuario'
      },
      text: 'mensaje del usuario'
  }
  
  ]


app.use (express.urlencoded({ extended: true}));

app.use(express.json());

app.set('view engine', 'ejs');

import ProductContenedor from "./src/contenedores/ProductContenedor.js";
const productContenedor = new ProductContenedor();

import mysqlConnection from './database/mysqlConnection.js';
import ProductContenedorSQL from "./src/contenedores/ProductContenedorSQL.js";
const productContenedorSQL = new ProductContenedorSQL(mysqlConnection, 'productos');

const PORT = 8080;
server.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));


app.get('/', (req, res) => {
   // ProductContenedor.save(req.body);
    const personList = [];
  res.render('pages/index', { list: personList });
});

app.post('/products', (req, res) => {
    console.log(req.body);
    productContenedor.save(req.body);
    io.sockets.emit("products", productContenedorSQL.getAll())
    res.redirect('/'); 
  }); 

app.get('/products', (req, res) => {
    console.log(req.body)
    productContenedorSQL.getAll()
    res.json();
});

//fackers
import { faker } from '@faker-js/faker'
faker.locale = "es_MX"

let id = 1
function getNextId() {
    return id++
}
function crearProductoAlAzar (id){
  return{
    id,
    nombre: faker.commerce.product(),
    precio: faker.commerce.price(1000, 1000, 0, '$'),
    fotoUrl: faker.image.food(1234, 2345, true)
  }
}

function generarNProductos(cant) {
  const personas = []
  for (let i = 0; i < cant; i++) {
      personas.push(crearProductoAlAzar(getNextId()))
  }
  return personas
}

const CANT_PERS_DEFAULT = 5

app.get('/api/productos-test', (req, res) => {
  const cant = Number(req.query.cant) || CANT_PERS_DEFAULT
  res.json(generarNProductos(cant))
})

app.use("/api/products", productRouter);
app.use("/api/messages", messagesRouter);