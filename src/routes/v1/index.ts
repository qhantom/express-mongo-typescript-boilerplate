import express, { Router } from 'express'

import { authRoutes } from './auth.route'
import { userRoutes } from './user.route'

const router = express.Router()

interface Route {
  path: string
  routes: Router
}

const routes: Route[] = [
  {
    path: '/auth',
    routes: authRoutes,
  },
  {
    path: '/users',
    routes: userRoutes,
  },
]

routes.forEach((route: Route) => {
  router.use(route.path, route.routes)
})

export { router }
