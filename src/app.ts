import express from 'express'
import passport from 'passport'
import { strategy } from './configs'

const app = express()

import { router as routes } from './routes/v1'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

passport.use('jwt', strategy)

// ROUTES
app.use('/v1', routes)

export { app }
