import express from 'express'

import { isAuthenticated } from '../../middlewares'
import { authController } from '../../controllers'

const router = express.Router()

router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/logout', isAuthenticated, authController.logout)

export { router as authRoutes }
