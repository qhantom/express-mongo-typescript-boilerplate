import createHttpError from 'http-errors'

import { User } from '../models'

import { UserDocument, User as IUser } from '../types/user.type'

async function getUsers(): Promise<UserDocument[]> {
  const users: UserDocument[] = await User.find().select('-password')
  return users
}

async function getUser(id: string): Promise<UserDocument> {
  const user: UserDocument = await User.findById(id).select('-password')
  return user
}

async function createUser(body: IUser): Promise<UserDocument> {
  if (await User.doesEmailExist(body.email)) {
    throw createHttpError(400, 'Email already exists')
  }

  const user: UserDocument = await User.create(body)
  return user
}

async function updateUser(id: string, body: IUser): Promise<UserDocument> {
  if (await User.doesEmailExist(body.email)) {
    throw createHttpError(400, 'Email already exists')
  }

  const user: UserDocument = await User.findByIdAndUpdate(id, body, {
    new: true,
  }).select('-password')
  return user
}

async function deleteUser(id: string): Promise<void> {
  await User.findByIdAndDelete(id)
}

export { getUsers, getUser, createUser, updateUser, deleteUser }
