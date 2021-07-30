import { Request, Response, NextFunction } from 'express'

import { roleService } from '../services'

import { Role } from '../types/role.type'

async function getRoles(req: Request, res: Response, next: NextFunction) {
  const roles: Role[] = await roleService.getRoles()
  res.status(200).json(roles)
}

async function getRole(req: Request, res: Response, next: NextFunction) {
  const role: Role = await roleService.getRole(req.params.id)
  res.status(200).json(role)
}

async function createRole(req: Request, res: Response, next: NextFunction) {
  const role: Role = await roleService.createRole(req.body)
  res.status(201).json(role)
}

async function updateRole(req: Request, res: Response, next: NextFunction) {
  const role: Role = await roleService.updateRole(req.params.id, req.body)
  res.status(200).json(role)
}

async function deleteRole(req: Request, res: Response, next: NextFunction) {
  await roleService.deleteRole(req.params.id)
  res.status(200).send()
}

export { getRoles, getRole, createRole, updateRole, deleteRole }
