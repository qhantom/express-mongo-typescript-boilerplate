import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import createHttpError from 'http-errors'

import { tokenService } from '../services'

function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  passport.authenticate(
    'jwt',
    { session: false },
    async (error, payload, info) => {
      if (error || !payload || info) {
        next(createHttpError(401, error || info))
      }

      const token = await tokenService.findToken(
        req.headers?.authorization?.split(' ')[1],
      )

      if (token) {
        next(createHttpError(401, 'Token blacklisted'))
      }

      next()
    },
  )(req, res, next)
}

export { isAuthenticated }
