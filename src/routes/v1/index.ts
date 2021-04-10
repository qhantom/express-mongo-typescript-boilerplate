import express from 'express'
const router = express.Router()

import { authRoutes } from './auth.route'

const routes = [
  {
    path: '/auth',
    routes: authRoutes,
  },
]

for (const route of routes) {
  router.use(route.path, route.routes)
}

export { router }
