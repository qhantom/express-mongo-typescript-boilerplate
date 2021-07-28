import createHttpError from 'http-errors'

import { userTypes } from '../types'

import { User } from '../models'

async function getUsers(): Promise<userTypes.UserDocument[]> {
  const users: userTypes.UserDocument[] = await User.find().select('-password')
  return users
}

async function getUser(id: string): Promise<userTypes.UserDocument> {
  const user: userTypes.UserDocument = await User.findById(id).select(
    '-password',
  )
  return user
}

async function createUser(
  body: userTypes.User,
): Promise<userTypes.UserDocument> {
  if (await User.doesEmailExist(body.email)) {
    throw createHttpError(400, 'Email already exists')
  }

  const user: userTypes.UserDocument = await User.create(body)
  return user
}

async function updateUser(
  id: string,
  body: userTypes.User,
): Promise<userTypes.UserDocument> {
  if (await User.doesEmailExist(body.email)) {
    throw createHttpError(400, 'Email already exists')
  }

  const user: userTypes.UserDocument = await User.findByIdAndUpdate(id, body, {
    new: true,
  })
  return user
}

async function deleteUser(id: string): Promise<void> {
  await User.findByIdAndDelete(id)
}

export { getUsers, getUser, createUser, updateUser, deleteUser }
