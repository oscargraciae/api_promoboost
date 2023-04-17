import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { SECRET_KEY } from '../../config/constants'

import { User } from '../../entities/user.entity'

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: SECRET_KEY
}

passport.use(new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.id, isActive: true } })

    if (user == null) return done(null, false)

    return done(null, payload)
  } catch (e) {
    return done(e, false)
  }
}))

export const authJwt = passport.authenticate('jwt', { session: false })
