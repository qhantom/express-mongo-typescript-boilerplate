import jwt from 'jsonwebtoken'
import { fromUnixTime } from 'date-fns'

import { config } from '../configs'
import { User } from '../models'
import { tokenTypes, userTypes } from '../types'
import { tokenService } from './'

async function register(user: userTypes.User): Promise<userTypes.UserDocument> {
  if (await User.doesEmailExist(user.email)) {
    console.log('Email is already taken')
    return
  }

  const createdUser = await User.create(user)
  return createdUser
}

async function login(
  credentials: userTypes.User
): Promise<tokenTypes.TokenResponse> {
  const user = await User.findOne({ email: credentials.email })

  if (user === null || !(await user.doesPasswordMatch(credentials.password))) {
    console.log('No user found')
  } else {
    return tokenService.createToken(user)
  }
}

async function logout(user: userTypes.User, token: string) {
  const userDocument = await User.findOne({ email: user.email })

  if (!userDocument) {
    console.log('User does not exist')
    return
  }

  const payload = jwt.verify(
    token.split(' ')[1],
    config.jwt.secret
  ) as tokenTypes.Payload

  await tokenService.invalidateToken(
    userDocument,
    token.split(' ')[1],
    fromUnixTime(payload.exp)
  )

  return
}

export { register, login, logout }
