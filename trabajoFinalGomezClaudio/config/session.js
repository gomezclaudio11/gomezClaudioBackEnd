import MongoStore from "connect-mongo";
import session from "express-session";
import * as dotenv from "dotenv";

dotenv.config();
// setteo sesiones
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGOBD_CONNECTION_STRING,
 
});

export default session({
  store: sessionStore,
  secret: "sessionSecret", 
  //resave: true,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  //rolling: false,
  //unset: "destroy",
 cookie:  {
      maxAge: 1000 * 60 * 60
   },
});