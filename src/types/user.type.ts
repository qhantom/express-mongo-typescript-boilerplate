import { Document } from 'mongoose'

interface User {
  email: string
  password: string
}

type UserDocument = User & Document

export { User, UserDocument }
