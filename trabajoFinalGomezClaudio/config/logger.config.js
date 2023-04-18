import log4js from 'log4js';

log4js.configure({
  appenders: {
    default: { type: 'console' },
    infoFile: { type: 'file', filename: './logs/info.log' },
    warnFile: { type: 'file', filename: './logs/warn.log' },
    errorFile: { type: 'file', filename: './logs/error.log' },
  },
  categories: {
    default: { appenders: ['default', 'infoFile'], level: 'info' },
    warnFile: { appenders: ['default', 'warnFile'], level: 'warn' },
    errorFile: { appenders: ['default', 'errorFile'], level: 'error' },
  },
});

const loggerDefault = log4js.getLogger();
const loggerWarn = log4js.getLogger('warnFile');
const loggerError = log4js.getLogger('errorFile');

export { loggerDefault, loggerWarn, loggerError };