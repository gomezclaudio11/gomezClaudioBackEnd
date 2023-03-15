import express from "express";
import ProductRouter from "./routes/products.router.js";
import session from "./config/session.js";
import passport from "passport";
import multer from "multer";
import passportConfig from "./config/passport.js";
import * as UserService from "./service/user.service.js";
import { configAuthRouter } from "./routes/auth.router.js";
import multerConfig from "./config/multer.config.js";
import CarritoRouter from "./routes/carrito.router.js";
const app = express();


// configuro el servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuro las rutas estatica
/********** EJBs (MOTOR DE PLANTILLAS) ***********/
app.set("view engine", "ejs");
//--------------------------------------------
// configuro sesion
app.use(session);


// passportConfig -> passport + strategy
passportConfig(passport, UserService)
// passport.authenticate()
app.use(passport.initialize());
app.use(passport.session());
//--------------------------------------------
// configuro multer

const upload = multer({ storage: multerConfig });

const authRouter = express.Router();

configAuthRouter(authRouter, upload, passport);

app.use("/api/auth", authRouter);

app.use("/api/products", ProductRouter);
app.use("/api/carrito", CarritoRouter);


export default app;