import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'

import { isAuthenticated } from '../../middlewares'
import { rightController } from '../../controllers'

const router: Router = express.Router()

router.get('/', isAuthenticated, asyncHandler(rightController.getRights))

router.get('/:id', isAuthenticated, asyncHandler(rightController.getRight))

router.post('/', isAuthenticated, asyncHandler(rightController.createRight))

router.put('/:id', isAuthenticated, asyncHandler(rightController.updateRight))

router.delete(
  '/:id',
  isAuthenticated,
  asyncHandler(rightController.deleteRight),
)

export { router as rightRoute }
