import http from 'http'
import mongoose, { NativeError } from 'mongoose'

import { app } from './app'

import { config, logger } from './configs'

import { registerShutdownHandler } from './utils/lifecycles'

let server: http.Server

function startHttpServer(): void {
  logger.info(`Starting HTTP Server on port ${config.server.port}`)
  server = app.listen(config.server.port, () => {
    logger.info('HTTP Server started')
  })
}

function stopHttpServer(): Promise<void> {
  logger.info('Stopping HTTP Server')

  return new Promise((resolve, reject) => {
    server.close(error => {
      if (error) {
        reject(error)
      } else {
        resolve(undefined)
      }
    })
  })
}

function connectDatabase(): Promise<void> {
  logger.info(`Connecting to database`)

  return new Promise((resolve, reject) => {
    mongoose.connect(
      config.database.URI,
      config.database.options,
      (error: NativeError) => {
        if (error) {
          logger.error(`Database Error: ${error}`)
          reject(error)
        } else {
          logger.info('Database connected')
          resolve(undefined)
        }
      },
    )

    if (config.environment === 'development') {
      mongoose.set('debug', true)
    }
  })
}

async function main(): Promise<void> {
  logger.info(`Running in ${config.environment} mode`)

  await connectDatabase()

  startHttpServer()

  registerShutdownHandler(stopHttpServer)
}

main()
