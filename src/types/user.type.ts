import { Document } from 'mongoose'

import { Role } from './role.type'

type UserEmail = string
type UserPassword = string

interface User {
  email: UserEmail
  password: UserPassword
  role: Role
}

interface UserDocument extends User, Document {
  doesPasswordMatch: (password: UserPassword) => Promise<boolean>
}

export { User, UserDocument, UserEmail, UserPassword }
