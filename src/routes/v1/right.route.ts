import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'

import { isAuthenticated, isAuthorized } from '../../middlewares'
import { rightController } from '../../controllers'
import { Rights } from '../../configs'

const router: Router = express.Router()

router.get(
  '/',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.RIGHT_READ)),
  asyncHandler(rightController.getRights),
)

router.get(
  '/:id',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.RIGHT_READ)),
  asyncHandler(rightController.getRight),
)

router.post(
  '/',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.RIGHT_CREATE)),
  asyncHandler(rightController.createRight),
)

router.put(
  '/:id',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.RIGHT_UPDATE)),
  asyncHandler(rightController.updateRight),
)

router.delete(
  '/:id',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.RIGHT_DELETE)),
  asyncHandler(rightController.deleteRight),
)

export { router as rightRoute }
