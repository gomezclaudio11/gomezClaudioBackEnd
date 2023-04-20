/* EXPRESS */
import express from "express";
import http from "http";
import { Server } from "socket.io";


/* Loggers */
import { defaultLogger, warnLogger } from './middlewares/logger.middleware.js';
import { loggerDefault, loggerError } from "./config/logger.config.js";

/* Intanciacion app */
const app = express();
const server = http.Server(app);

/* Passport, bcript */
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'

/* Services */
import UserFactory from './service/user.service.js'
const UserService = new UserFactory()
import MensajeFactory from './service/mensaje.service.js'
const MensajeService = new MensajeFactory()

/* ROUTERS */
import ProductRouter from "./routes/products.router.js";
import CarritoRouter from "./routes/carrito.router.js";
import AuthRouter from "./routes/auth.router.js";

/* Session, authentication y passport */
import session from './config/session.js'
import passport from 'passport'

/* PASSPORT */
/* Signup */
passport.use(
  'signup',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'username' },
    async (req, username, password, done) => {
      const { email, fullName, telefono, rol } = req.body
      try {
        const user = await UserService.getUserByUsername(username)
        if (user) {
          return done(null, false)
        } else {
          const hashedPassword = await bcrypt.hash(password, 10)
          const userData = {
            username,
            password: hashedPassword,
            fullName,
            email,
            telefono,
            rol
          }
          const newUser = await UserService.createUser(userData)
          return done(null, newUser)
        }
      } catch (error) {
        return done(error)
      }
    }
  )
)

/* Login */
passport.use(
  'login',
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await UserService.getUserByUsername(username)
      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
          return done(null, false)
        } else {
          return done(null, user)
        }
      } else {
        return done(null, false)
      }
    } catch (error) {
      return done(error)
    }
  })
)

/* Serializacion y deserializacion de usuario */
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await UserService.getUserById(id)
  done(null, user)
})



// configuro el servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// configuro las rutas estatica
app.use(express.static('./public'));

/* Motor de plantillas */
app.set('view engine', 'ejs')

/* configuracion sesion, autenticacion y passport */
app.use(session)
app.use(passport.initialize())
app.use(passport.session())
/*Loguea todas las peticiones a las rutas */
app.use(defaultLogger);

//--------------------------------------------

app.use("/", AuthRouter);
app.use("/productos", ProductRouter);
app.use("/carrito", CarritoRouter);


/* --------------------------------------------------- */
/* SOCKETS.IO */

const io = new Server(server);

/* Conexion sochet */
io.on("connection", async (socket) => {
  loggerDefault.info(`Nuevo cliente socket conectado - id: ${socket.id}`);

  /* Comentarios */
  socket.emit("conversation", await MensajeService.getAllMensajes());

  /* Recibe un nuevo comentario */
  socket.on("nuevo-mensaje", async (nuevoMensaje) => {
    await MensajeService.createMensaje(nuevoMensaje);
    /* Actualiza el listado de comentarios */
    io.sockets.emit("conversation", await MensajeService.getAllMensajes());
  });

});

/* Rutas no implementadas */
app.get('*', warnLogger, (req, res) => {
  res.render('pages/not-found')
})

/* Escucha del server */
app.listen(8080, () => loggerDefault.info('conectado!'))

/* En caso de fallo del server */
server.on('error', (error) => loggerError.error(`Error en servidor ${error}`))
