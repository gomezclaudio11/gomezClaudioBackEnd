// importo las estrategia de passport-local
import { Strategy as LocalStrategy } from "passport-local";
// * en tu passport config/wrapper
const passportConfig = (passport, userService) => {
  const strategyOptions = { usernameField: "email" };
  // dos estrategias, signup y login
  const signupStrategy = new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    userService.signup
  );
  const loginStrategy = new LocalStrategy(strategyOptions, userService.login);
  passport.use("signup", signupStrategy);
  passport.use("login", loginStrategy);

  // creo las funciones de serialize/deserialize user
  passport.serializeUser((user, done) => {
    console.log("e", user)
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    console.log(id)
    const user = await userService.getUserById(id)
    console.log(user)
    return done(null, user);
  });
};

export default passportConfig;