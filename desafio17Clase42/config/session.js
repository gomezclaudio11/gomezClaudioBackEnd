import MongoStore from "connect-mongo";
import session from "express-session";
import * as dotenv from "dotenv";

dotenv.config();
// setteo sesiones
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGOBD_CONNECTION_STRING,
  /* ttl: 60,*/
});

export default session({
  store: sessionStore,
  secret: "sessionSecret",

 
  resave: true,
  rolling: false,
  saveUninitialized: false,
  unset: "destroy",
  // cookie:  {
  //    sameSite: "none",  
  //    maxAge: 8600000
  // },
});