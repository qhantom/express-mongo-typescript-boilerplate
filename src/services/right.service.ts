import createHttpError from 'http-errors'
import { Right } from '../models'

import { rightTypes } from '../types'

function doesRightExist(name: string): Promise<boolean> {
  return Right.exists({ name })
}

async function getRights(): Promise<rightTypes.Right[]> {
  const rights = await Right.find()
  return rights
}

async function getRight(id: string): Promise<rightTypes.Right> {
  const right = await Right.findById(id)
  return right
}

async function createRight(body: rightTypes.Right): Promise<rightTypes.Right> {
  if (await doesRightExist(body.name)) {
    throw createHttpError(400, `Right with name ${body.name} already exists`)
  }

  const right = await Right.create(body)
  return right
}

async function updateRight(
  id: string,
  body: rightTypes.Right,
): Promise<rightTypes.Right> {
  const right = await Right.findByIdAndUpdate(id, body, { new: true })
  return right
}

async function deleteRight(id: string): Promise<void> {
  await Right.findByIdAndDelete(id)
}

export { getRights, getRight, createRight, updateRight, deleteRight }
