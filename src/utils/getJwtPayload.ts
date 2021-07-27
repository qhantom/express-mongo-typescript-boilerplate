import jwtDecode from 'jwt-decode'

import { tokenTypes } from '../types'

function getJwtPayload(token: string): tokenTypes.Payload {
  return jwtDecode(token)
}

export { getJwtPayload }
