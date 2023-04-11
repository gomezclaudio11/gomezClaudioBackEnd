/* EXPRESS */
import express from "express";

/* ROUTERS */
import ProductRouter from "./routes/products.router.js";
import CarritoRouter from "./routes/carrito.router.js";
import AuthRouter from "./routes/auth.router.js";

/* Loggers */
import { defaultLogger } from './middlewares/logger.middleware.js';

/* SESSION, AUTHENTICATION Y PASSPORT */
import session from "./config/session.js";
import passport from "passport";

import multer from "multer";
import multerConfig from "./config/multer.config.js";


// configuro el servidor
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuro las rutas estatica
/********** EJBs (MOTOR DE PLANTILLAS) ***********/
app.set("view engine", "ejs");
//--------------------------------------------
// configuro sesion
app.use(session);


// passport.authenticate()
app.use(passport.initialize());
app.use(passport.session());
/*Loguea todas las peticiones a las rutas */
app.use(defaultLogger);


//--------------------------------------------
// configuro multer

const upload = multer({ storage: multerConfig });



app.use("/cafeteria", AuthRouter);
app.use("/products", ProductRouter);
app.use("/carrito", CarritoRouter);


export default app;