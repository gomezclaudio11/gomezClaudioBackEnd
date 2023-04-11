import app from "./app.js";
/* Loggers */
import { loggerDefault } from './config/logger.config.js';


app.listen(8080, () => loggerDefault.info('conectado!'))