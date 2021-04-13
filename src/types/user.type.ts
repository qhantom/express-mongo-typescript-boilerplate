import { Document } from 'mongoose'

interface User {
  email: string
  password: string
}

interface UserDocument extends User, Document {
  doesPasswordMatch: (password: string) => Promise<boolean>
}

export { User, UserDocument }
