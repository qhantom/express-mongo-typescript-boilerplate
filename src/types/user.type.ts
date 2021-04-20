import { Document } from 'mongoose'

type UserEmail = string
type UserPassword = string

interface User {
  email: UserEmail
  password: UserPassword
}

interface UserDocument extends User, Document {
  doesPasswordMatch: (password: UserPassword) => Promise<boolean>
}

export { User, UserDocument, UserEmail, UserPassword }
