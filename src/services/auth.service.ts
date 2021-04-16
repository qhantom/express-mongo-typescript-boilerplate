import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'
import { fromUnixTime } from 'date-fns'

import { config } from '../configs'
import { User } from '../models'
import { tokenTypes, userTypes } from '../types'
import { createToken, invalidateToken } from './token.service'

async function register(user: userTypes.User): Promise<userTypes.UserDocument> {
  if (await User.doesEmailExist(user.email)) {
    throw createHttpError(400, 'Email already exist')
  }

  const createdUser = await User.create(user)
  return createdUser
}

async function login(
  credentials: userTypes.User,
): Promise<tokenTypes.TokenResponse> {
  const user = await User.findOne({ email: credentials.email })

  if (user === null || !(await user.doesPasswordMatch(credentials.password))) {
    throw createHttpError(401, 'Email or password incorrect')
  } else {
    return createToken(user)
  }
}

async function logout(user: userTypes.User, token: tokenTypes.BearerToken) {
  const userDocument = await User.findOne({ email: user.email })

  if (!userDocument) {
    throw createHttpError(404, 'User does not exist')
  }

  const extractedToken = token.split(' ')[1]

  const payload = jwt.verify(
    extractedToken,
    config.jwt.secret,
  ) as tokenTypes.Payload

  await invalidateToken(userDocument, extractedToken, fromUnixTime(payload.exp))
}

export { register, login, logout }
