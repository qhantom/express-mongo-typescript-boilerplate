import mongoose, { NativeError } from 'mongoose'

import { app } from './app'

import { config, logger } from './configs'

mongoose.connect(
  config.database.URI,
  config.database.options,
  (error: NativeError) => {
    if (error) {
      logger.error(`Database Error: ${error}`)
    } else {
      logger.info('Database connected')

      app.listen(config.server.port, () => {
        logger.info(`Server started on port ${config.server.port}`)
      })
    }
  },
)
