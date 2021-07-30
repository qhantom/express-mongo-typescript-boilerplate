import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'

import { userService } from '../services'

import { UserDocument } from '../types/user.type'
import { Payload } from '../types/token.type'

import { getTokenFromHeader } from '../utils/getTokenFromHeader'
import { getJwtPayload } from '../utils/getJwtPayload'

async function getUsers(req: Request, res: Response, next: NextFunction) {
  const users: UserDocument[] = await userService.getUsers()
  res.status(200).json(users)
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  const user: UserDocument = await userService.getUser(req.params.id)
  res.status(200).json(user)
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  const user: UserDocument = await userService.createUser(req.body)
  res.status(201).json(user)
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  const user: UserDocument = await userService.updateUser(
    req.params.id,
    req.body,
  )
  res.status(200).json(user)
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { sub }: Payload = getJwtPayload(getTokenFromHeader(req))

  if (sub === req.params.id) {
    throw createHttpError(400, 'You cannot delete yourself')
  }

  await userService.deleteUser(req.params.id)
  res.status(200).send()
}

export { getUsers, getUser, createUser, updateUser, deleteUser }
