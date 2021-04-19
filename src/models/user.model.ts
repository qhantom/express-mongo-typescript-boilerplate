import { Schema, model, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

import { userTypes } from '../types'

interface IUser extends Model<userTypes.UserDocument> {
  doesEmailExist: (email: userTypes.UserEmail) => Promise<boolean>
}

const userSchema: Schema<userTypes.UserDocument> = new Schema(
  {
    email: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.statics.doesEmailExist = async function (
  email: userTypes.UserEmail,
): Promise<boolean> {
  const user = await this.findOne({ email })
  return Boolean(user)
}

userSchema.methods.doesPasswordMatch = async function (
  password: userTypes.UserPassword,
): Promise<boolean> {
  const user = this

  return bcrypt.compare(password, user.password)
}

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User: IUser = model<userTypes.UserDocument, IUser>('User', userSchema)

export { User }
