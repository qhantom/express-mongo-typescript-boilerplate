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
    async (error, payload, info): Promise<any> => {
      if (error || !payload || info) {
        return next(createHttpError(401, error || info))
      }

      const token = await tokenService.findToken(
        req.headers?.authorization?.split(' ')[1],
      )

      if (token) {
        return next(createHttpError(401, 'Token blacklisted'))
      }

      return next()
    },
  )(req, res, next)
}

export { isAuthenticated }
