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

router.put(
  '/:id',
  isAuthenticated,
  registerValidator(),
  asyncHandler(userController.updateUser),
)

router.delete('/:id', isAuthenticated, asyncHandler(userController.deleteUser))

export { router as userRoutes }
