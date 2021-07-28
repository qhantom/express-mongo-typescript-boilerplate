import createHttpError from 'http-errors'
import { Role } from '../models'

import { roleTypes } from '../types'

function doesRoleExist(name: string): Promise<boolean> {
  return Role.exists({ name })
}

async function getRoles(): Promise<roleTypes.Role[]> {
  const roles = await Role.find()
  return roles
}

async function getRole(id: string): Promise<roleTypes.Role> {
  const role = await Role.findById(id)
  return role
}

async function createRole(body: roleTypes.Role): Promise<roleTypes.Role> {
  if (await doesRoleExist(body.name)) {
    throw createHttpError(400, `Role with name ${body.name} already exists`)
  }

  const role = await Role.create(body)
  return role
}

async function updateRole(
  id: string,
  body: roleTypes.Role,
): Promise<roleTypes.Role> {
  const role = await Role.findByIdAndUpdate(id, body, { new: true })
  return role
}

async function deleteRole(id: string): Promise<void> {
  await Role.findByIdAndDelete(id)
}

export { getRoles, getRole, createRole, updateRole, deleteRole }
