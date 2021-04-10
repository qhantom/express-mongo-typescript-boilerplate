import { Schema, model, Model } from 'mongoose'
import { userTypes } from '../types'

const userSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const User: Model<userTypes.UserDocument> = model('User', userSchema)

export { User }
