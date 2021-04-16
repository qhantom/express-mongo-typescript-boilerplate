import { Document } from 'mongoose'

type BearerToken = string
interface Token {
  token: BearerToken
  user: string
  expirationDate: string
}

interface TokenResponse {
  token: BearerToken
  expirationDate: Date
}

type TokenDocument = Token & Document

interface Payload {
  sub: string
  iat: number
  exp: number
  issuer: string
}

export { Token, TokenDocument, TokenResponse, Payload, BearerToken }
