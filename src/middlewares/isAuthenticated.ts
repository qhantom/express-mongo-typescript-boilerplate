import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

import { findToken } from '../services/token.service'

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    passport.authenticate(
      'jwt',
      { session: false },
      async (error, payload, info) => {
        if (error || !payload || info) {
          throw new Error(info)
        }

        const token = await findToken(req.headers.authorization.split(' ')[1])

        if (token) {
          throw new Error('Token blacklisted')
        }

        return next()
      }
    )(req, res, next)
  } catch (error) {
    next(error)
  }
}

export { isAuthenticated }
