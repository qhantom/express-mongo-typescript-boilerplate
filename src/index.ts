import mongoose, { NativeError } from 'mongoose'

import { app } from './app'

import { config } from './configs/config'

mongoose.connect(
  config.database.URI,
  config.database.options,
  (err: NativeError) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Database connected')

      app.listen(config.server.port, () => {
        console.log(`Server started in port ${config.server.port}`)
      })
    }
  }
)
