import express from 'express'
import asyncHandler from 'express-async-handler'

import { isAuthenticated } from '../../middlewares'
import { authController } from '../../controllers'

const router = express.Router()

router.post('/register', asyncHandler(authController.register))

router.post('/login', asyncHandler(authController.login))

router.post('/logout', isAuthenticated, asyncHandler(authController.logout))

export { router as authRoutes }
