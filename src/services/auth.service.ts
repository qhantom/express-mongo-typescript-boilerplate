import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'
import { fromUnixTime } from 'date-fns'

import { config } from '../configs'
import { User } from '../models'
import { tokenTypes, userTypes } from '../types'
import { tokenService } from './'

async function register(user: userTypes.User): Promise<userTypes.UserDocument> {
  if (await User.doesEmailExist(user.email)) {
    throw createHttpError(400, 'Email address already exist')
  }

  const createdUser = await User.create(user)
  return createdUser
}

async function login(
  credentials: userTypes.User,
): Promise<tokenTypes.TokenResponse> {
  const user = await User.findOne({ email: credentials.email })

  if (user === null || !(await user.doesPasswordMatch(credentials.password))) {
    throw createHttpError(400, 'Email or password incorrect')
  } else {
    return tokenService.createToken(user)
  }
}

async function logout(user: userTypes.User, token: string) {
  const userDocument = await User.findOne({ email: user.email })

  if (!userDocument) {
    throw createHttpError(400, 'User does not exist')
  }

  const payload = jwt.verify(
    token.split(' ')[1],
    config.jwt.secret,
  ) as tokenTypes.Payload

  await tokenService.invalidateToken(
    userDocument,
    token.split(' ')[1],
    fromUnixTime(payload.exp),
  )
}

export { register, login, logout }
