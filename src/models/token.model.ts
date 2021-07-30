import { Schema, model, Model, SchemaTypes } from 'mongoose'

import { TokenDocument } from '../types/token.type'

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

const Token: Model<TokenDocument> = model('Token', tokenSchema)

export { Token }
