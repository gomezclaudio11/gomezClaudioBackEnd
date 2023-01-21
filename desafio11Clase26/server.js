import express from 'express'
import exphbs from "express-handlebars"
import mongoose from 'mongoose'
import http from 'http'
import { Server, Socket} from 'socket.io'
import productRouter from "./src/routers/products.js"
import messagesRouter from "./src/routers/messages.js"
import session from "express-session";
import passport from 'passport';
import LocalStrategy   from 'passport-local'
import MongoStore from "connect-mongo";
import ProductContenedor from "./src/contenedores/ProductContenedor.js";
const productContenedor = new ProductContenedor();
import mysqlConnection from './database/mysqlConnection.js';
import ProductContenedorSQL from "./src/contenedores/ProductContenedorSQL.js";
const productContenedorSQL = new ProductContenedorSQL(mysqlConnection, 'productos');
import ContenedorMensajeMongoDb from './src/contenedores/ContenedorMensajeMongoDb.js'
import ContenedorUsuarios from './src/contenedores/ContenedorUsuarios.js'
const contenedorUsuarios = new ContenedorUsuarios (usuarios, usuarioSchema)
/******* PASSPORT ************* */

passport.use("login", new LocalStrategy(
    (username, password, done) =>{
      contenedorUsuarios.findOne( { username }, (err, user) =>{
        if (err)
        return done (err);

        if (!user) {
          console.log("usuario no encontrado");
          return done (null, false);
        }

        if (!isValidPassword(user, password)){
          console.log(" password invalido");
          return done (null, false);
      }

      return done (null, user);
    });
  })
);

function isValidPassword(user, password) {
  return bCrypt.compareSync (password, user.password);
}


/********** SERVER ***********/
const app = express()
const server = http.Server(app)

/************* mongoose *********/
const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
})

const usuarioDAO = mongoose.model("usuarios", usuarioSchema) 

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
  const contenedorMensajeMongo = new ContenedorMensajeMongoDb ("mensaje", mensajeSchema)

  //normalizr
  import { normalize, denormalize, schema } from "normalizr";

  // Definimos un esquema de usuarios (autores y comentadores)
const authorSchema = new schema.Entity("author");

// Definimos un esquema de comentadores
const commentSchema = new schema.Entity("text", {
  author: authorSchema,
});

// Definimos un esquema 
const postSchema = new schema.Entity("newMessage", {
  author: authorSchema,
  comments: [commentSchema],
});

import { inspect } from 'util';

function print(objeto) {
  console.log(inspect(objeto, false, 12, true))
}

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

 


/*********** middleware ***********/
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use (express.urlencoded({ extended: true}));

app.use(express.json());

app.set('view engine', 'ejs');

/******** auth ********/

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}


/********* routes *********** */
/******* REGISTRO **********/

app.get("/register", (req, res) => {
  res.render("pages/register");
});

app.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/failregister",
    successRedirect: "/",
  })
);


app.get("/failregister", (req, res) => {
  res.render("pages/register-error");
});

/******* LOGIN ********/
app.get("/login", (req, res)=>{
  res.render("pages/login")
});
app.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/faillogin",
    successRedirect: "/",
  })
);

app.get("/faillogin", (req, res) => {
  res.render("pages/login-error");
});

/********* inicio ********* */

app.get('/', (req, res) => {
   // ProductContenedor.save(req.body);
    const personList = [];
  res.render('pages/index', { list: personList });
});
app.post('/products', (req, res) => {
    console.log(req.body);
    productContenedorSQL.save(req.body);
    io.sockets.emit("products", productContenedorSQL.getAll())
    res.redirect('/products'); 
  }); 

app.get('/products', (req, res) => {
    console.log(req.body)
    const productsList = productContenedorSQL.getAll()
    //res.json();
    res.render('pages/products', {productos: productsList})
  });

  app.use("/api/products", productRouter);
  app.use("/api/messages", messagesRouter);

/******** fackers *******/
import { faker } from '@faker-js/faker'
import { log } from 'console'
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

/******** LISTEN  **********/
const PORT = 8080;
server.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
