import mongoose, { NativeError } from 'mongoose'

import { app } from './app'

import { config, logger } from './configs'

mongoose.connect(
  config.database.URI,
  config.database.options,
  (err: NativeError) => {
    if (err) {
      logger.error(`Database Error: ${err}`)
    } else {
      logger.info('Database connected')

      app.listen(config.server.port, () => {
        logger.info(`Server started in port ${config.server.port}`)
      })
    }
  },
)
