import { Router } from 'express';
import passport from 'passport';
import { isAuth } from '../middlewares/auth.middleware.js';

/* Loggers */
//import {  warnLogger } from '../middlewares/logger.middleware.js';

/* Router */
const AuthRouter = new Router()

/* Login */
AuthRouter.get('/login', (req, res) => {
  res.render('pages/login')
})

AuthRouter.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/faillogin',
  })
)

AuthRouter.get('/faillogin', (req, res) => {
  res.render('pages/login-error')
})

/* Signup */
AuthRouter.get('/register', (req, res) => {
  res.render("pages/register")
})

AuthRouter.post(
  '/register',
  passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/failregister',
    sesion: false,
  })
)

AuthRouter.get('/failregister', (req, res) => {
  res.render('pages/register-error')
})

AuthRouter.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/end')
  })
})

AuthRouter.get('/end', (req, res) => {
  res.render('pages/logout')
})

AuthRouter.get('/', isAuth, (req, res) => {
  res.render('pages/home', { username: req.user.username, rol: req.user.rol })
})

AuthRouter.get('/admin/productos', isAuth, (req, res) => {
  res.render('pages/adminProducts', { username: req.user.username, rol: req.user.rol })
})


/************ / INFO ***********/
AuthRouter.get('/stats', isAuth, (req, res) => {
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
  res.json ({ ArgumentoDeEntrada: entrada, 
    plataforma: sistema, 
    versionNode: versionNode, 
    memoria: memoriaReservada, 
    path: pathEjecucion, 
    processId: processId, 
    carpeta: carpeta,
    URLMongoAtlas: "https://cloud.mongodb.com/v2/639a6792ee1350371bda8c4c#/metrics/replicaSet/639a68e22fc8734b6eccf7d0/explorer/ecomerce"
  })
})


export default AuthRouter
