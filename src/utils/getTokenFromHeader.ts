import { Request } from 'express'

function getTokenFromHeader(req: Request): string | null {
  if (req.headers?.authorization) {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

export { getTokenFromHeader }
