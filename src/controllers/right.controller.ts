import { Request, Response, NextFunction } from 'express'

import { rightService } from '../services'

import { Right } from '../types/right.type'

async function getRights(req: Request, res: Response, next: NextFunction) {
  const rights: Right[] = await rightService.getRights()
  res.status(200).json(rights)
}

async function getRight(req: Request, res: Response, next: NextFunction) {
  const right: Right = await rightService.getRight(req.params.id)
  res.status(200).json(right)
}

async function createRight(req: Request, res: Response, next: NextFunction) {
  const right: Right = await rightService.createRight(req.body)
  res.status(201).json(right)
}

async function updateRight(req: Request, res: Response, next: NextFunction) {
  const right: Right = await rightService.updateRight(req.params.id, req.body)
  res.status(200).json(right)
}

async function deleteRight(req: Request, res: Response, next: NextFunction) {
  await rightService.deleteRight(req.params.id)
  res.status(200).send()
}

export { getRights, getRight, createRight, updateRight, deleteRight }
