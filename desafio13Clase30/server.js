/************* comienzo normalizr *********/
// importacion normalizr
import { normalize, denormalize, schema } from "normalizr"; // actualmente no se esta utlizando pero podrias dejarlo ya que 
                                                            //era requerido en el ejercicio anterior, no obtante si lo borras todo lo de normalizr
                                                            // no va a cambiar nada

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

import { inspect } from "util";

function print(objeto) {
  console.log(inspect(objeto, false, 12, true));
}
/************* fin normalizr *********/






/************************************************************/
/************* A PARTIR DE ACA EMPIEZA EL SERVER.JS *********/
/************************************************************/



/************* IMPORTACIONES *********/
// importaciones express y http
import express from "express";
import http from "http";

// importaciones sesiones y autenticaciones
import session from "express-session";
import passport from "passport";


import passportLocal from "passport-local"; 
const LocalStrategy = passportLocal.Strategy;

// importacion sockets
import { Server, Socket } from "socket.io";

// importaciones - contenedores / bases de datos
import mongoose from "mongoose";
import mysqlConnection from "./database/mysqlConnection.js";
import ProductContenedorSQL from "./src/contenedores/ProductContenedorSQL.js";
import ContenedorMensajeMongoDb from "./src/contenedores/ContenedorMensajeMongoDb.js";
import ContenedorUsuarios from "./src/contenedores/ContenedorUsuarios.js";


/********** SERVER ***********/
// instanciacion de servidor
const app = express();
const server = http.Server(app);


/******* CONTENEDOR SQL ************* */
// instanciacion productos (mysql)
const productContenedorSQL = new ProductContenedorSQL(mysqlConnection, "productos");


/************* MOONGOSE *********/
// definicion de squema usuario (mongo)
const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true },
  //password: { type: String, required: true },
});

// usuarios no esta definido: hay que escribir el primer parametro entre comillas("")
// const contenedorUsuarios = new ContenedorUsuarios(usuarios, usuarioSchema);
// >> correccion >>:
const contenedorUsuarios = new ContenedorUsuarios("usuario", usuarioSchema); 

// definicion de schema mensaje (mongo)

const mensajeSchema = new mongoose.Schema({
  author: {
    id: String,
    name: String,
    surname: String,
    age: String,
    alias: String,
    avatar: String,
    date: String,
  },
  text: String,
});

// instanciacion contenedor mensajes mongo
const contenedorMensajeMongo = new ContenedorMensajeMongoDb("mensaje", mensajeSchema);


/********** SESSION Y PASSPORT ***********/
// passport configuracion para login 
passport.use("login", new LocalStrategy(async (username, password, done) => {
   const user = await contenedorUsuarios.findOne(username) 

     if (!user) {
        console.log("usuario no encontrado");
        return done(null, false);
      }
      // si no pasa nada de lo anterior retorna null, user (el resultado)
      return done(null, user);
    }))

// REALIZAR: configurar las otras rutas de passport ("register", )
//passport configuracion para register
passport.use( "register", new LocalStrategy( {
  passReqToCallback: true, usernameField : "username"
}, async (req, username, password, done) => {
    const usuario = await contenedorUsuarios.findOne( "username" );
    
    if (usuario) {
        return done (null, false);
      }
    const user = {
      username: username
    }
    contenedorUsuarios.create (user)
        return done(null, user);
      })
    );


// REALIZAR: realizar los metodos serializeUser y deserializeUser de passport

passport.serializeUser( (user, done) =>{
  done(null, user._id);
});

passport.deserializeUser( async (id, done) => {
  const user = await contenedorUsuarios.findById (id)
  done (null,user)
})

// funcion aparte para saber si la contraseña es valida (utilizando bcript)
// tener en cuanta que para utlizar bcript para validar tambien hay que 
// utilizarlo para encriptar, por lo que hay qeu realizar el metodo correspondiente (VER clase 25)
function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

// seteo de session
// REALIZAR: para que cumpla con la consigna a la configuracion de session se pide cargar el tiempo de la cookie en 10
// minutos (atributo maxAge, recordar que 1 segundo = 1000)
// tambien se pide reinizializar el tiempo cada vez que se recarga, esto se setea con el atributo "rolling: true", agregarlo 
app.use(session({
  secret: "secreto",
  resave: false,
  saveUninitialized: false,
  rolling: true,
    cookie: {
         maxAge: 600000
    }
})
);

// inicializacion de passport e indicacion que lo use con session
app.use(passport.initialize());
app.use(passport.session());


/********** SOCKETS.IO ***********/
// instanciacion de socket
const io = new Server(server);

// connexion inicial de sochet (en /home)
io.on("connection", async (socket) => {

  // log chequeo usuario socket conectado
  console.log("socket id: ", socket.id);

  // envia los productos que consulta en mysql
  socket.emit("products", await productContenedorSQL.getAll());

  // envia los mensajes que consulta en mongo
  socket.emit("conversation", await contenedorMensajeMongo.getAll());

  // recibe un mensaje y actualiza los mensaje
  socket.on("new-message", async (newMessage) => {
    
    // log chequeo del mensaje
    console.log({ newMessage });

    // guarda el nuevo mensaje
    await contenedorMensajeMongo.save(newMessage);
    // actualiza los mensaje nuevamente
    io.sockets.emit("conversation", await contenedorMensajeMongo.getAll());
  });
});


/********** SETEOS DE EXPRESS ***********/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/********** EJBs (MOTOR DE PLANTILLAS) ***********/
app.set("view engine", "ejs");


/******** AUTHENTICACION CON PASSPORT (req.isAuthenticated) ********/
// funcion para saber si esta autenticado, no esta en uso actualmente, pero hay que aplicarla como middleware en el endpoint que genera la vista principal
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}


/******************************* RUTAS/ENDPOINTS ********************** */

/******* REGISTRO *******/

app.get("/register", (req, res) => {
  // renderiza la vista en /register
  res.render("pages/register");
});

app.post("/register", passport.authenticate("register", { // se envia los datos del formulario de alta de usuario, se lo delega a 
                                                          //passport, pero aun no funciona xq falta definir "register"
    failureRedirect: "/failregister", // si falla redirige a /failregister
    successRedirect: "/", // si sale todo bien va al home ("/"), con la session iniciada
  })
);

app.get("/failregister", (req, res) => { // endpoint por si falla el registro con passport
  res.render("pages/register-error"); // redirige hacia la vista de error
});

/******* LOGIN ********/

app.get("/login", (req, res) => {
  res.render("pages/login"); // vista donde va el formulario de login
});

app.post("/login", passport.authenticate("login", { // se envia los datos del formulario de login, se delega la authenticacion a passport
                                                    // pero aun no funciona xq falta definir el contenedor mongo aun no esta completo
    failureRedirect: "/faillogin", // si falla redirige a /faillogin
    successRedirect: "/", // si sale todo bien va al home ("/")
  })
);

app.get("/faillogin", (req, res) => { // endpoint por si falla el login con passport
  res.render("pages/login-error");
});

/******* LOGOUT ********/

// REALIZAR: endpoint para recibir la peticion del boton de logout, este endpoint debera utlizar el metodo req.logout() de 
// passport (ver clase 25) y tambien redirigir el flujo a la vista de index nuevamente (o login)

app.get ("/logout", isAuth, (req, res) => {
  req.logout();
  res.redirect("/");
});

/********* INICIO (HOME) ********* */

// El siguiente endpoint se utiliza para obetner la vista principal de la app, que contiene todo lo realizado en los proyectos anteriores (logica de productos y mensajes)
// Este endpoint tiene el siguiente problema:
app.get("/", isAuth, (req, res) => { // REALIZAR: el endpoint no verifica que es authenticado, hay que usar el 
                              // middleware de passport, en este caso se debe utlizar el metodo "isAuth()" definido anteriormente
                              // tener en cuenta que una vez que se agrega el middleware "isAuth" ya no se podra acceder hasta que 
                              // el contenedor de usuarios este funcionando correctamente (al momento no puede crear un usuario, y por ende, 
                              // tampoco puede verificar que exista)

  res.render("pages/index");
});

// El siguiente endpoint se utiliza para recibir un nuevo producto, guardar en la BD y actualzar la lista de productos a travez de sockets.
// Tenia los siguientes problemas:
// >> como se llama a una base de debia ser asincronico tanto el callback como los metodos de los conetenedores sql (utilizar async/await)
// >> debia redireccionear al home nuevamente, para mostrar el historial de productos
// app.post("/products", (req, res) => {
//   console.log(req.body);
//   productContenedorSQL.save(req.body);
//   io.sockets.emit("products", productContenedorSQL.getAll());
//   res.redirect("/products");
// });
// >>>> Correccion >>>>:
app.post("/products", async (req, res) => {
  console.log(req.body);
  await productContenedorSQL.save(req.body);
  io.sockets.emit("products", await productContenedorSQL.getAll());
  res.redirect("/");
});


/************ / INFO ***********/
app.get("/info", (req, res) =>{
  const entrada = process.argv.slice(2).join (",")
  const sistema = process.platform;
  const versionNode = process.version;
  const memoriaReservada = parseInt(process.memoryUsage().rss / 1024 / 1024 )
  const pathEjecucion = process.execPath;
  const processId = process.pid;
  const carpeta = process.cwd();

  
  console.log(
    `argumento de entrada: ${entrada}`,
    `nombre de la plataforma: ${sistema}`,
    `version de node.js: ${versionNode}`,
    `memorio total reservada ${memoriaReservada}`,
    `path de ejecucion: ${pathEjecucion}`,
    ` proccess id: ${processId}`,
    ` carpeta del proyecto: ${carpeta}`
  );
  res.json ({ ArgumentoDeEntrada: entrada, plataforma: sistema, versionNode: versionNode, memoria: memoriaReservada, path: pathEjecucion, processId: processId, carpeta: carpeta })
})

/********* api/random *********/
import { fork } from "child_process"
import path from "path"
/*
app.get ("/api/randoms/:cant", (req, res) => {
  const cant = req.params.cant
const randomNumber = fork (path.resolve(process.cwd(), "randomNumber.js"))
randomNumber.on ("message", )


res.json( numbers )
})
*/


/******** FAKER *******/
import { faker } from "@faker-js/faker";
import { createHash } from "crypto";
faker.locale = "es_MX";

//  generacion de id de los productos ramdom a crear:
let id = 1;

function getNextId() {
  return id++;
}

// funcion para crear los productos con faker
function crearProductoAlAzar(id) {
  return {
    id,
    nombre: faker.commerce.product(),
    precio: faker.commerce.price(1000, 1000, 0, "$"),
    fotoUrl: faker.image.food(1234, 2345, true),
  };
}

// funcion para generar los productos en el endpoint
function generarNProductos(cant) {
  const personas = [];
  for (let i = 0; i < cant; i++) {
    personas.push(crearProductoAlAzar(getNextId()));
  }
  return personas;
}

// cantidad de productos a generar
const CANT_PROD_DEFAULT = 5; // a corregir: para qeu sea mas descriptivo deberia llamarse CANT_PROD_DEFAULT en vez de CANT_PERS_DEFAULT

app.get("/api/productos-test", (req, res) => {
  const cant = Number(req.query.cant) || CANT_PROD_DEFAULT; // significa que si no recibe el parametro la cantidad por default sera 5. Number() convierte el parametro a tipo number (los parametros se reciben como tipo string)
  res.json(generarNProductos(cant));
});



/******** MINIMIST ******** */

import  parseArgs  from "minimist";

const argv = parseArgs (process.argv.slice(2), { alias: { p: "port" }, default: { port: 8080 } })


/******** LISTEN  **********/

//const PORT = 8080;
server.listen( argv.port, () =>
  console.log(`Servidor iniciado en el puerto ${argv.port}`)
  );

/******* CLUSTER *********/

import cluster, { Worker } from "cluster";
import os from "os";

const modoCluster = process.argv[3] === "CLUSTER";
const numCPUs = os.cpus().length

/* master */
if (modoCluster.isPrimary){
  console.log(numCPUs);
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++){
    cluster.fork()
  }
  cluster.on("exit", worker => {
    console.log("woker", worker.process.pid, "died");
    cluster.fork()
  })
}
/* workers */
else {

  const app = express()

  const PORT = parseInt(process.argv[2]) || 8080

  app.get ("/api/randoms/:cant", async (req, res) => {
    const cant = req.params.cant  
    const numbers = await new Promise((resolve, reject) => {
      const forked = fork (path.resolve(process.cwd(), "randomNumber.js"))
      forked.on ("message", mensaje => {
        if(mensaje == "listo") {
          forked.send(cant)
        } else {  
          resolve(mensaje)
        }})
      })
      res.json( numbers )
      });
  
  app.listen(PORT, err => {
    if (!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
})
}
