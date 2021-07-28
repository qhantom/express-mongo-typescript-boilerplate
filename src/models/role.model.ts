import { model, Schema } from 'mongoose'
import mongooseAutopopulate from 'mongoose-autopopulate'

import { roleTypes } from '../types'

const roleSchema = new Schema({
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
  rights: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Right',
      autopopulate: true,
    },
  ],
})

roleSchema.plugin(mongooseAutopopulate)

const Role = model<roleTypes.Role>('Role', roleSchema)

export { Role }
