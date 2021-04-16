import http from 'http'
import mongoose, { NativeError } from 'mongoose'

import { app } from './app'

import { config, logger } from './configs'

let server: http.Server

mongoose.connect(
  config.database.URI,
  config.database.options,
  (error: NativeError) => {
    if (error) {
      logger.error(`Database Error: ${error}`)
    } else {
      logger.info('Database connected')

      server = app.listen(config.server.port, () => {
        logger.info(`Server started on port ${config.server.port}`)
      })
    }
  },
)

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received')
  if (server) {
    server.close()
  }
})

process.on('SIGINT', () => {
  logger.info('SIGINT signal received')
  if (server) {
    server.close()
  }
})
