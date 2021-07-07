import { logger } from '../configs'

const shutdownHandler: any[] = [] // stopped here

async function gracefulShutdown(): Promise<void> {
  const promises: Promise<any>[] = []
  for (const handler of shutdownHandler) {
    promises.push(handler())
  }

  Promise.all(promises)

  process.exit(0)
}

function uncaughtExceptionHandler(error: Error): void {
  logger.error('uncaughtException', error)
  process.exit(1)
}

function unhandledRejectionHandler(error: Error): void {
  logger.error('unhandledRejection', error)
  process.exit(1)
}

process.on('uncaughtException', uncaughtExceptionHandler)
process.on('unhandledRejection', unhandledRejectionHandler)
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server')
  gracefulShutdown()
})

function registerShutdownHandler(handler: any): void {
  shutdownHandler.push(handler)
}

export { registerShutdownHandler }
