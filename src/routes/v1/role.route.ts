import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'

import { Rights } from '../../configs'

import { isAuthenticated, isAuthorized } from '../../middlewares'

import { roleController } from '../../controllers'

const router: Router = express.Router()

router.get(
  '/',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.ROLE_READ)),
  asyncHandler(roleController.getRoles),
)

router.get(
  '/:id',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.ROLE_READ)),
  asyncHandler(roleController.getRole),
)

router.post(
  '/',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.ROLE_CREATE)),
  asyncHandler(roleController.createRole),
)

router.put(
  '/:id',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.ROLE_UPDATE)),
  asyncHandler(roleController.updateRole),
)

router.delete(
  '/:id',
  isAuthenticated,
  asyncHandler(isAuthorized(Rights.ROLE_DELETE)),
  asyncHandler(roleController.deleteRole),
)

export { router as roleRoutes }
