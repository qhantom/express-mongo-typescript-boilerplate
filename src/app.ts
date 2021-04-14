import express, { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import createHttpError, { HttpError } from 'http-errors'

import { config, strategy } from './configs'

import { router as routes } from './routes/v1'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

passport.use('jwt', strategy)

// ROUTES
app.use('/v1', routes)

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404))
})

app.use((err: HttpError, req: Request, res: Response) => {
  const { status = 500, message, stack } = err

  res.status(status).json({
    status,
    message,
    stack: config.environment === 'production' ? null : stack,
  })
})

export { app }
