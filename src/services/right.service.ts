import createHttpError from 'http-errors'

import { Right } from '../models'

import { Right as IRight } from '../types/right.type'

function doesRightExist(name: string): Promise<boolean> {
  return Right.exists({ name })
}

async function getRights(): Promise<IRight[]> {
  const rights: IRight[] = await Right.find()
  return rights
}

async function getRight(id: string): Promise<IRight> {
  const right: IRight = await Right.findById(id)
  return right
}

async function createRight(body: IRight): Promise<IRight> {
  if (await doesRightExist(body.name)) {
    throw createHttpError(400, `Right with name ${body.name} already exists`)
  }

  const right: IRight = await Right.create(body)
  return right
}

async function updateRight(id: string, body: IRight): Promise<IRight> {
  const right: IRight = await Right.findByIdAndUpdate(id, body, { new: true })
  return right
}

async function deleteRight(id: string): Promise<void> {
  await Right.findByIdAndDelete(id)
}

export { getRights, getRight, createRight, updateRight, deleteRight }
