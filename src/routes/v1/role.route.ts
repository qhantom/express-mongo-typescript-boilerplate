import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'

import { isAuthenticated } from '../../middlewares'
import { roleController } from '../../controllers'

const router: Router = express.Router()

router.get('/', isAuthenticated, asyncHandler(roleController.getRoles))

router.get('/:id', isAuthenticated, asyncHandler(roleController.getRole))

router.post('/', isAuthenticated, asyncHandler(roleController.createRole))

router.put('/:id', isAuthenticated, asyncHandler(roleController.updateRole))

router.delete('/:id', isAuthenticated, asyncHandler(roleController.deleteRole))

export { router as roleRoutes }
