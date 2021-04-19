import { createLogger, format, transports } from 'winston'

import { config } from './config'

const { combine, colorize, timestamp, errors, splat, json, simple } = format

function productionLogger() {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), splat(), json()),
    transports: [new transports.Console()],
  })
}

function developmentLogger() {
  return createLogger({
    level: 'debug',
    format: combine(
      colorize(),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      errors({ stack: true }),
      simple(),
    ),
    transports: [new transports.Console()],
  })
}

const logger =
  config.environment === 'development'
    ? developmentLogger()
    : productionLogger()

export { logger }
