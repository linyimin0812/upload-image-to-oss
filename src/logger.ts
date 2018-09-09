import * as winston from 'winston'
import * as path from 'path'
import * as os from "os"
import fs from 'fs'
export const logger = function (): winston.Logger {
  let logger: winston.Logger
  /**
   * console
   */
  if (process.env.NODE_ENV === 'development') {
    logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.colorize({colorize: process.stdout.isTTY}),
        winston.format.splat(),
        winston.format.label({ label: stackInfo() }),
        winston.format.printf(info => {
          return `${new Date().toLocaleString()} ${info.level}: [${info.label}] ${info.message}`;
        })
      )
    })
    logger.add(new winston.transports.Console({
      level: 'silly',
    }))

  }
  // write log to the special files 
  else {
    logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        winston.format.label({ label: stackInfo() }),
        winston.format.printf(info => {
          return `${new Date().toLocaleString()} ${info.level}: [${info.label}] ${info.message}`;
        })
      ),
      
    })
    const baseDir = path.join(`${process.env.HOME}`, '.upload-picture-to-oss')
    if (! fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir)
    }
    logger.add(new winston.transports.File({ filename: `${baseDir}/info.log`, level: 'silly' }))
    logger.add(new winston.transports.File({ filename: `${baseDir}/error.log`, level: 'error' }))
  }
  return logger
}

//TODO: There is a bug, the line is always the line when logger() invoked
function stackInfo(): string {
  // Stack trace format :
  // https://github.com/v8/v8/wiki/Stack%20Trace%20API

  // Use RegExp to get relative infomation
  const stackReg = /at\s+.*\s+\((.*):(\d*):(\d*)\)/i
  /**
   * Error
        at stackInfo (/home/linyimin/项目/api-gateway/src/combination/src/util/logger.ts:60:15)
        at logger (/home/linyimin/项目/api-gateway/src/combination/src/util/logger.ts:14:39)
        at Object.<anonymous> (/home/linyimin/项目/api-gateway/src/combination/test/test1.ts:1:42)
   */
  const stackList = (new Error().stack).split(os.EOL).slice(3)
  const info = stackList[0]
  let reuslt = ''
  const sp = stackReg.exec(info)
  if (sp && sp.length === 4) {
    const filename = sp[1].split(path.sep).pop()
    const lineNum  = sp[2]
          reuslt   = `${filename}:${lineNum}`
  }
  return reuslt
}