import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'

import { Rights } from '../configs/rights'

import { Right } from '../types/right.type'
import { User } from '../types/user.type'

function isAuthorized(right: keyof typeof Rights) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { role } = req.user as User

    if (!role.rights.some((r: Right) => r.name === right)) {
      throw createHttpError(401, 'Not sufficient rights')
    }

    next()
  }
}

export { isAuthorized }
