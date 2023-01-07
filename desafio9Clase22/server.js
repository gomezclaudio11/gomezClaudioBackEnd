import express from 'express'
import http from 'http'
import { Server, Socket} from 'socket.io'
import productRouter from "./src/routers/products.js"
import messagesRouter from "./src/routers/messages.js"
const app = express()
const server = http.Server(app)


const io = new Server(server)
io.on('connection', (socket) => {
    console.log('socket id: ', socket.id);
  
    socket.emit('products', productContenedorSQL.getAll());
    
    socket.emit('conversation', messages);
    socket.on('new-message', (newMessage) => {
    console.log({newMessage});
    messages.push(newMessage);
    io.sockets.emit('conversation', messages);
    });
  });

  const messages = [
    { mail: 'pepe@gmail.com', text: 'Hola'},
    { mail: 'grillo@gmail.com', text: 'todo bien?'},
    { mail: 'pepe@gmail.com', text: 'Si, todo bien!'}
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
    //io.sockets.emit("products", productContenedorSQL.getAll())
    res.redirect('/'); 
  }); 

app.get('/products', (req, res) => {
    console.log(req.body)
    productContenedorSQL.getAll()
    res.json();
});

//fackers
import { faker } from '@faker-js/faker'
faker.locale = "ar"

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