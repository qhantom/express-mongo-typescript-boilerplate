import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'

import { isAuthenticated, validate, registerValidator } from '../../middlewares'
import { userController } from '../../controllers'

const router: Router = express.Router()

router.get('/', isAuthenticated, asyncHandler(userController.getUsers))

router.get('/:id', isAuthenticated, asyncHandler(userController.getUser))

router.post(
  '/',
  isAuthenticated,
  registerValidator(),
  validate,
  asyncHandler(userController.createUser),
)

// router.put('/:id', isAuthenticated, asyncHandler(userController.register))

// router.delete('/:id', isAuthenticated, asyncHandler(userController.register))

export { router as userRoutes }
