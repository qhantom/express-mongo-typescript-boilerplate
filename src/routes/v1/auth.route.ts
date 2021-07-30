import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'

import {
  isAuthenticated,
  validate,
  registerValidator,
  loginValidator,
} from '../../middlewares'

import { authController } from '../../controllers'

const router: Router = express.Router()

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

router.get('/me', isAuthenticated, asyncHandler(authController.me))

router.get('/logout', isAuthenticated, asyncHandler(authController.logout))

export { router as authRoutes }
