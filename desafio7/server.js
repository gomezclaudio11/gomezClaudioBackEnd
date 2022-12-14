const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const productRouter = require("./src/routers/products")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)



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
    { mail: 'pepe@gmail.com', text: 'Si, todo bien!'},
  ]

app.use (express.urlencoded({ extended: true}));

app.use(express.json());

app.set('view engine', 'ejs');

//const ProductContenedor = require("./src/contenedores/ProductContenedor");
//const productContenedor = new ProductContenedor();

const mysqlConnection = require('./database/mysqlConnection');
const ProductContenedorSQL = require ("./src/contenedores/ProductContenedorSQL");
const productContenedorSQL = new ProductContenedorSQL(mysqlConnection, 'productos');

const PORT = 8080;
httpServer.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));


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

app.use("/api/products", productRouter);