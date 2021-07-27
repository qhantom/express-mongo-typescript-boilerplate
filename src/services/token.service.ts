import jwt from 'jsonwebtoken'
import { addHours } from 'date-fns'

import { Token, User } from '../models'
import { config } from '../configs'
import { tokenTypes, userTypes } from '../types'

async function invalidateToken(
  email: userTypes.UserEmail,
  token: tokenTypes.BearerToken,
  expirationDate: Date,
): Promise<tokenTypes.TokenDocument> {
  const user = await User.findOne({ email })

  return Token.create({
    token,
    user: user._id,
    expirationDate,
  })
}

function findToken(token: tokenTypes.BearerToken) {
  return Token.findOne({
    token,
  })
}

async function createToken(
  user: userTypes.UserDocument,
): Promise<tokenTypes.TokenResponse> {
  const expirationDate: Date = addHours(
    new Date(),
    Number(config.jwt.expirationHours),
  )

  const payload: tokenTypes.Payload = {
    sub: user._id,
    iat: Math.floor(Date.now() / 1000),
    exp:
      Math.floor(Date.now() / 1000) +
      60 * 60 * Number(config.jwt.expirationHours), // 24 h
    issuer: config.jwt.issuer,
  }

  const token: tokenTypes.BearerToken = jwt.sign(payload, config.jwt.secret)

  return {
    token,
    expirationDate,
  }
}

export { createToken, invalidateToken, findToken }
