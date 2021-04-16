import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

function registerValidator() {
  return [
    body('email').isEmail().normalizeEmail().trim(),
    body('password').trim().isStrongPassword(),
  ]
}

function loginValidator() {
  return [
    body('email').isEmail().normalizeEmail().trim(),
    body('password').trim().isStrongPassword(),
  ]
}

function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const sanitizedErrors = errors
    .array()
    .map((error) => ({ [error.param]: error.msg }))

  return res.status(400).json({ validationErrors: sanitizedErrors })
}

export { validate, registerValidator, loginValidator }
