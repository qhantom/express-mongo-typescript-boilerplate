import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'

import { Rights } from '../../configs'

import {
  isAuthenticated,
  isAuthorized,
  validate,
  registerValidator,
} from '../../middlewares'

import { userController } from '../../controllers'

const router: Router = express.Router()

router.get(
  '/',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.USER_READ)),
  asyncHandler(userController.getUsers),
)

router.get(
  '/:id',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.USER_READ)),
  asyncHandler(userController.getUser),
)

router.post(
  '/',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.USER_CREATE)),
  registerValidator(),
  validate,
  asyncHandler(userController.createUser),
)

router.put(
  '/:id',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.USER_UPDATE)),
  registerValidator(),
  asyncHandler(userController.updateUser),
)

router.delete(
  '/:id',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.USER_DELETE)),
  asyncHandler(userController.deleteUser),
)

export { router as userRoutes }
