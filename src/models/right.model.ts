import { model, Schema } from 'mongoose'

import { Right as IRight } from '../types/right.type'

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

const Right = model<IRight>('Right', rightSchema)

export { Right }
