import { Router } from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import UserFactory from '../service/user.service.js'

const UserService = new UserFactory()

/* PASSPORT */

/* Signup */
passport.use(
  'signup',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "username" },
    async (req, username, password, done) => {
      const { name } = req.body
      console.log(username);
      try {
        const user = await UserService.getUserByUsername(username)
        if (user) {
          return done(null, false)
        } else {
          const hashedPassword = await bcrypt.hash(password, 10)
          const userData = {
            username,
            password: hashedPassword,
            name,
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

/* Autorizacion y authenticacion */
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/cafeteria/login')
  }
}

/* Router */
const AuthRouter = new Router()

/* Login */
AuthRouter.get('/login', (req, res) => {
  res.render('pages/login')
})

AuthRouter.post('/login', passport.authenticate('login', {
    successRedirect: '/cafeteria',
    failureRedirect: '/cafeteria/faillogin',
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
    failureRedirect: '/cafeteria/failregister',
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
    res.redirect('/cafeteria/end')
  })
})

AuthRouter.get('/end', (req, res) => {
  res.render('pages/logout')
})

AuthRouter.get('/', isAuth, (req, res) => {
  res.render('pages/index')
})

export default AuthRouter




