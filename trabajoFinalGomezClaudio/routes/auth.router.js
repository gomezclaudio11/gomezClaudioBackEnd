import { Router } from 'express';
import passport from 'passport';
import { isAuth } from '../middlewares/auth.middleware.js';

/* Loggers */
import {  warnLogger } from '../middlewares/logger.middleware.js';

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
  res.render('pages/register')
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
  res.render('pages/index', { username: req.user.username })
})

AuthRouter.get('/admin/bebidas', isAuth, (req, res) => {
  res.render('pages/bebidas', { username: req.user.username, rol: req.user.rol })
})

AuthRouter.get('*', warnLogger, (req, res) => {
  res.render('pages/not-found')
})

export default AuthRouter
