import express, { Request, Response, NextFunction } from 'express'
const app = express()

import { router as routes } from './routes/v1'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTES
app.use('/v1', routes)

export { app }
