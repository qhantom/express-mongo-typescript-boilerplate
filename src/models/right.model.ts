import { model, Schema } from 'mongoose'

import { rightTypes } from '../types'

const rightSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
    uppercase: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
})

const Right = model<rightTypes.Right>('Right', rightSchema)

export { Right }
