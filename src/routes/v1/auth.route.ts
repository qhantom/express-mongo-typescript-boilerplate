import express from 'express'
import asyncHandler from 'express-async-handler'

import {
  isAuthenticated,
  validate,
  registerValidator,
  loginValidator,
} from '../../middlewares'
import { authController } from '../../controllers'

const router = express.Router()
router.post(
  '/register',
  registerValidator(),
  validate,
  asyncHandler(authController.register),
)

router.post(
  '/login',
  loginValidator(),
  validate,
  asyncHandler(authController.login),
)

router.post('/logout', isAuthenticated, asyncHandler(authController.logout))

export { router as authRoutes }
