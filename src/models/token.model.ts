import { Schema, model, Model, SchemaTypes } from 'mongoose'

import { tokenTypes } from '../types'

const tokenSchema: Schema = new Schema(
  {
    token: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Token: Model<tokenTypes.TokenDocument> = model('Token', tokenSchema)

export { Token }
