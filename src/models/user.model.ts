import { Schema, model, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

import { UserEmail, UserPassword, UserDocument } from '../types/user.type'

interface IUser extends Model<UserDocument> {
  doesEmailExist: (email: UserEmail) => Promise<boolean>
}

const userSchema: Schema<UserDocument> = new Schema(
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
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

/* eslint-disable-next-line func-names */
userSchema.statics.doesEmailExist = async function (
  email: UserEmail,
): Promise<boolean> {
  const user = await this.findOne({ email })
  return Boolean(user)
}

/* eslint-disable-next-line func-names */
userSchema.methods.doesPasswordMatch = async function (
  password: UserPassword,
): Promise<boolean> {
  const user = this

  return bcrypt.compare(password, user.password)
}

/* eslint-disable-next-line func-names */
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User: IUser = model<UserDocument, IUser>('User', userSchema)

export { User }
