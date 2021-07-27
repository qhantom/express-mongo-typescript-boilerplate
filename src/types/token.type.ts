import { Document } from 'mongoose'

import { UserEmail } from './user.type'

type BearerToken = string
type Issuer = string

interface Token {
  token: BearerToken
  user: UserEmail
  expirationDate: Date
}

interface TokenResponse {
  token: BearerToken
  expirationDate: Date
}

type TokenDocument = Token & Document

interface Payload {
  sub: string // ObjectId of user
  iat: number
  exp: number
  issuer: Issuer
}

export { Token, TokenDocument, TokenResponse, Payload, BearerToken }
