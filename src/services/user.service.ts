import createHttpError from 'http-errors'

import { userTypes } from '../types'

import { User } from '../models'

async function getUsers(): Promise<userTypes.UserDocument[]> {
  const users: userTypes.UserDocument[] = await User.find().select('-password')
  return users
}

async function getUser(id: string): Promise<userTypes.UserDocument> {
  const user: userTypes.UserDocument = await User.findOne({ _id: id }).select(
    '-password',
  )
  return user
}

async function createUser(body: any): Promise<userTypes.UserDocument> {
  if (await User.doesEmailExist(body.email)) {
    throw createHttpError(400, 'Email already exists')
  }

  const user: userTypes.UserDocument = await User.create(body)
  return user
}

export { getUsers, getUser, createUser }
