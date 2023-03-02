 // LOG4JS
 import  log4js  from "log4js";

  // LOG4JS

  log4js.configure({
    appenders:{
      loggerConsole: {type: "console"},
      loggerWarningFile: {type: "file", filename: "warning.log"},
      loggerErrorFile: {type: "file", filename: "error.log"}
      },
    categories:{
        default:{
            appenders:["loggerConsole"],
            level:"trace"
        },
      info:{
        appenders: ["loggerConsole"],
        level: "info",
      },
      warning:{
        appenders: ["loggerConsole", "loggerWarningFile"],
        level: "warn",
      },
      error:{
        appenders: ["loggerConsole", "loggerErrorFile"],
        level: "error",
    }
  }});
  
  export const logInfo = log4js.getLogger("info");
  export const logWarn = log4js.getLogger("warn");
  export const logError = log4js.getLogger("error");

