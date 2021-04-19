import { Request, Response, NextFunction } from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'

interface SanitizedError {
  [param: string]: string
}

function registerValidator(): ValidationChain[] {
  return [
    body('email').isEmail().normalizeEmail().trim(),
    body('password').trim().isStrongPassword(),
  ]
}

function loginValidator(): ValidationChain[] {
  return [
    body('email').isEmail().normalizeEmail().trim(),
    body('password').trim().isStrongPassword(),
  ]
}

function validate(
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response<{ validationErrors: SanitizedError[] }> {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const sanitizedErrors: SanitizedError[] = errors
    .array()
    .map((error) => ({ [error.param]: error.msg }))

  return res.status(400).json({ validationErrors: sanitizedErrors })
}

export { validate, registerValidator, loginValidator }
