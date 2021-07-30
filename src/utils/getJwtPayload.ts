import jwtDecode from 'jwt-decode'

import { Payload } from '../types/token.type'

function getJwtPayload(token: string): Payload {
  return jwtDecode(token)
}

export { getJwtPayload }
