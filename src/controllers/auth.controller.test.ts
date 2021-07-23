import { authService } from '../services'

const USER = {
  email: 'test@test.de',
  password: 'Password123!',
}

describe('auth.controller.ts', () => {
  jest.spyOn(authService, 'login')

  it('should pass', () => {
    console.log(authService)
  })
})
