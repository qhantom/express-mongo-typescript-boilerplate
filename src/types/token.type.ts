import { Document } from 'mongoose'

interface Token {
  token: string
  user: string
  expirationDate: string
}

interface TokenResponse {
  token: string
  expirationDate: Date
}

type TokenDocument = Token & Document

interface Payload {
  sub: string
  iat: number
  exp: number
  issuer: string
}

export { Token, TokenDocument, TokenResponse, Payload }
