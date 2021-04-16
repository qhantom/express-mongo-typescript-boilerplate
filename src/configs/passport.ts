import {
  Strategy,
  StrategyOptions,
  ExtractJwt,
  VerifiedCallback,
} from 'passport-jwt'

import { tokenTypes } from '../types'
import { User } from '../models'
import { config } from './config'

const options: StrategyOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

async function verifyJwt(
  payload: tokenTypes.Payload,
  done: VerifiedCallback,
): Promise<void> {
  try {
    const user = await User.findOne({ email: payload.sub })

    if (!user) {
      done(null, false)
    } else {
      done(null, user)
    }
  } catch (error) {
    done(error, false)
  }
}

const strategy = new Strategy(options, verifyJwt)

export { strategy }
