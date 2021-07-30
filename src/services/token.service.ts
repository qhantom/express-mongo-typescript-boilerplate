import jwt from 'jsonwebtoken'
import { addHours } from 'date-fns'

import { config } from '../configs'

import { Token, User } from '../models'

import {
  BearerToken,
  Payload,
  TokenResponse,
  TokenDocument,
} from '../types/token.type'
import { UserDocument, UserEmail } from '../types/user.type'

async function invalidateToken(
  email: UserEmail,
  token: BearerToken,
  expirationDate: Date,
): Promise<TokenDocument> {
  const user = await User.findOne({ email })

  return Token.create({
    token,
    user: user._id,
    expirationDate,
  })
}

function findToken(token: BearerToken) {
  return Token.findOne({
    token,
  })
}

async function createToken(user: UserDocument): Promise<TokenResponse> {
  const expirationDate: Date = addHours(
    new Date(),
    Number(config.jwt.expirationHours),
  )

  const payload: Payload = {
    sub: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp:
      Math.floor(Date.now() / 1000) +
      60 * 60 * Number(config.jwt.expirationHours), // 24 h
    issuer: config.jwt.issuer,
  }

  const token: BearerToken = jwt.sign(payload, config.jwt.secret)

  return {
    token,
    expirationDate,
  }
}

export { createToken, invalidateToken, findToken }
