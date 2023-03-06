/************* comienzo normalizr *********/

// importacion normalizr
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



// importaciones - contenedores / bases de datos
import mongoose from "mongoose";
import ContenedorUsuarios from "./src/contenedores/ContenedorUsuarios.js";

/******** MINIMIST ******** */
import  parseArgs  from "minimist";

//log4js
import { logInfo } from "./logger/logger.js";
import { logWarn } from "./logger/logger.js";

/******* CLUSTER *********/

import cluster, { Worker } from "cluster";
import os from "os";

const modo = process.argv[3] || "FORK";
const numCPUs = os.cpus().length

/* master */
if (modo == "CLUSTER" && cluster.isPrimary){
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

   /********** SERVER ***********/
// instanciacion de servidor    
  const server = http.Server(app);


//LOG4JS
app.use ((req, res, next) => {
  logInfo.info(`${req.method} ${req.url}`)
  next()
})


/************* MOONGOSE *********/
// definicion de squema usuario (mongo)
const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true },
  //direccion: { type: String, required: true },
  //email: { type: String, required: true },
  //age: { type: Number, required: true },
  //phone: { type: Number, required: true },
  //avatar: { type: String, required: true },
  //password: { type: String, required: true },
});

const contenedorUsuarios = new ContenedorUsuarios("usuario", usuarioSchema); 

/********** SESSION Y PASSPORT ***********/
// passport configuracion para login 
passport.use("login", new LocalStrategy(async (username, password, done) => {
   const user = await contenedorUsuarios.findOne(username) 

     if (!user) {
        console.log("usuario no encontrado");
        return done(null, false);
      }
      return done(null, user);
    }))

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

passport.serializeUser( (user, done) =>{
  done(null, user.id);
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


/********** SETEOS DE EXPRESS ***********/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/********** EJBs (MOTOR DE PLANTILLAS) ***********/
app.set("view engine", "ejs");


/******** AUTHENTICACION CON PASSPORT (req.isAuthenticated) ********/
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

app.get ("/logout", isAuth, (req, res) => {
  req.logout();
  res.redirect("/");
});

/********* INICIO (HOME) ********* */


app.get("/", isAuth, (req, res) => { // REALIZAR: el endpoint no verifica que es authenticado, hay que usar el 
                              // middleware de passport, en este caso se debe utlizar el metodo "isAuth()" definido anteriormente
                              // tener en cuenta que una vez que se agrega el middleware "isAuth" ya no se podra acceder hasta que 
                              // el contenedor de usuarios este funcionando correctamente (al momento no puede crear un usuario, y por ende, 
                              // tampoco puede verificar que exista)

  res.render("pages/index");
});

app.post("/products", async (req, res) => {
  console.log(req.body);
  await productContenedorSQL.save(req.body);
  io.sockets.emit("products", await productContenedorSQL.getAll());
  res.redirect("/");
});


/******** MINIMIST ******** */
const argv = parseArgs (process.argv.slice(2), { alias: { p: "port" }, default: { port: 8080 } })

/**********  log4js *******/
app.use('*', (req, res, next) => {
  logWarn.warn(`${req.method} ${req.originalUrl} / la ruta no existe`)
  next()
})

const PORT = parseInt(process.argv[2]) || 8080

app.listen(PORT, err => {
    if (!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
})
}
