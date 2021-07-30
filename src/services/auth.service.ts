import { Request } from 'express'
import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'
import { fromUnixTime } from 'date-fns'

import { config } from '../configs'

import { User } from '../models'

import { createToken, invalidateToken } from './token.service'

import { TokenResponse, Payload, BearerToken } from '../types/token.type'
import { User as IUser, UserDocument } from '../types/user.type'

import { getTokenFromHeader } from '../utils/getTokenFromHeader'
import { getJwtPayload } from '../utils/getJwtPayload'

async function register(user: IUser): Promise<UserDocument> {
  if (await User.doesEmailExist(user.email)) {
    throw createHttpError(400, 'Email already exist')
  }

  const createdUser = await User.create(user)
  return createdUser
}

async function login(credentials: IUser): Promise<TokenResponse> {
  const user = await User.findOne({ email: credentials.email })

  if (!user || !(await user.doesPasswordMatch(credentials.password))) {
    throw createHttpError(401, 'Email or password incorrect')
  } else {
    return createToken(user)
  }
}

async function me(req: Request): Promise<UserDocument> {
  const payload: Payload = getJwtPayload(getTokenFromHeader(req))

  if (!payload) {
    throw createHttpError(400, 'Error while extracting payload from token')
  }

  const user = await User.findOne({ email: payload.sub })
    .select('-password')
    .populate('role')

  return user
}

async function logout(token: BearerToken) {
  const extractedToken = token.split(' ')[1]

  const payload = jwt.verify(extractedToken, config.jwt.secret) as Payload

  if (!payload) {
    throw createHttpError(401, 'Token invalid')
  }

  await invalidateToken(payload.sub, extractedToken, fromUnixTime(payload.exp))
}

export { register, login, logout, me }
