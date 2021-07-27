/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'

import { userTypes, tokenTypes } from '../types'

import { userService } from '../services'

import { getTokenFromHeader } from '../utils/getTokenFromHeader'
import { getJwtPayload } from '../utils/getJwtPayload'

async function getUsers(req: Request, res: Response, next: NextFunction) {
  const users: userTypes.UserDocument[] = await userService.getUsers()
  res.status(200).json(users)
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  const user: userTypes.UserDocument = await userService.getUser(req.params.id)
  res.status(200).json(user)
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  const createdUser: userTypes.UserDocument = await userService.createUser(
    req.body,
  )
  res.status(201).json(createdUser)
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  const updatedUser: userTypes.UserDocument = await userService.updateUser(
    req.params.id,
    req.body,
  )
  res.status(200).json(updatedUser)
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { sub }: tokenTypes.Payload = getJwtPayload(getTokenFromHeader(req))

  if (sub === req.params.id) {
    throw createHttpError(400, 'You cannot delete yourself')
  }

  await userService.deleteUser(req.params.id)
  res.status(200).send()
}

export { getUsers, getUser, createUser, updateUser, deleteUser }
