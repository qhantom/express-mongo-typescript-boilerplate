import { Request, Response, NextFunction } from 'express'

import { authService } from '../services'

async function register(req: Request, res: Response, next: NextFunction) {
  const user = await authService.register(req.body)
  res.status(201).json(user)
}

async function login(req: Request, res: Response, next: NextFunction) {
  const tokenResponse = await authService.login(req.body)
  res.status(200).json(tokenResponse)
}

async function me(req: Request, res: Response, next: NextFunction) {
  res.status(200).json(req.user)
}

async function logout(req: Request, res: Response, next: NextFunction) {
  await authService.logout(req.headers.authorization)
  res.status(200).send()
}

export { register, login, logout, me }
