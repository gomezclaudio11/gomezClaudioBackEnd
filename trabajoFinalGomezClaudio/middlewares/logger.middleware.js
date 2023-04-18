import { loggerDefault, loggerWarn } from '../config/logger.config.js';

const defaultLogger = (req, res, next) => {
  loggerDefault.info(`Acceso a: ruta ${req.path} y método ${req.method} correcto`);
  next();
};

const warnLogger = (req, res, next) => {
  loggerWarn.warn(`Recurso Inexistente: ruta ${req.path} y método ${req.method} no definida`);
  next();
};

export { defaultLogger, warnLogger };
