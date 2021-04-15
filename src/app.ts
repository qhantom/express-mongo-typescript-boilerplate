import express, { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import createHttpError, { HttpError } from 'http-errors'
import helmet from 'helmet'

import { config, strategy, successHandler, errorHandler } from './configs'

import { authLimiter } from './middlewares'

import { router as routes } from './routes/v1'

const app = express()

app.use(successHandler)
app.use(errorHandler)

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

passport.use('jwt', strategy)

if (config.environment !== 'development') {
  app.use('/v1/auth', authLimiter)
}

app.use('/v1', routes)

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404))
})

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message, stack } = err

  res.locals.errorMessage = message

  const response: { status: number; message: string; stack?: string } = {
    status,
    message,
  }

  if (config.environment === 'development') {
    response.stack = stack
  }

  res.status(status).json(response)
})

export { app }
