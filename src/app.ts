import path from 'path'
import express, { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import helmet from 'helmet'
import compression from 'compression'
import mongoSanitize from 'express-mongo-sanitize'
import createHttpError, { HttpError } from 'http-errors'

import { config, strategy, successHandler, errorHandler } from './configs'

import { generalRateLimiter } from './middlewares'

import { router as routes } from './routes/v1'

const app = express()

app.use(successHandler)
app.use(errorHandler)

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(mongoSanitize())

app.use(compression())

passport.use('jwt', strategy)

if (config.environment === 'production') {
  app.use(generalRateLimiter)
}

app.use(express.static(path.join(__dirname, '../public')))

app.use('/v1', routes)

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
