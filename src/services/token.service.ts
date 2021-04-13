import jwt from 'jsonwebtoken'
import { addHours } from 'date-fns'

import { Token } from '../models'
import { config } from '../configs'
import { tokenTypes, userTypes } from '../types'

function invalidateToken(
  user: userTypes.UserDocument,
  token: string,
  expirationDate: Date
): Promise<tokenTypes.TokenDocument> {
  return Token.create({
    token,
    user: user._id,
    expirationDate,
  })
}

function findToken(token: string) {
  return Token.findOne({
    token,
  })
}

async function createToken(
  user: userTypes.UserDocument
): Promise<tokenTypes.TokenResponse> {
  const expirationDate = addHours(
    new Date(),
    Number(process.env.JWT_EXPIRATION_HOURS)
  )

  const payload: tokenTypes.Payload = {
    sub: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp:
      Math.floor(Date.now() / 1000) +
      60 * 60 * Number(process.env.JWT_EXPIRATION_HOURS), // 24 h
    issuer: 'Boilerplate',
  }

  const token = jwt.sign(payload, config.jwt.secret)

  return {
    token,
    expirationDate,
  }
}

export { createToken, invalidateToken, findToken }
