import express from 'express'

import { authRoutes } from './auth.route'

const router = express.Router()

const routes = [
  {
    path: '/auth',
    routes: authRoutes,
  },
]

routes.forEach((route) => {
  router.use(route.path, route.routes)
})

export { router }
