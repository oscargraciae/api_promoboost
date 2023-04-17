import { verify } from 'argon2'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config/constants'
import { errorTypes } from '../../config/error-types'

import { Account } from '../../entities/account.entity'
import { User } from '../../entities/user.entity'

export class AuthService {
  async auth ({ email, password }: { email: string, password: string }) {
    const user = await User.findOne({ where: { email } })

    if (user == null) throw Error(errorTypes.USER_NOT_FOUND.code)
    if (!await verify(user.password, password)) throw Error(errorTypes.INVALID_PASSWORD.code)

    const account = await Account.findOne({ where: { id: user?.accountId } })
    if (account == null) throw Error(errorTypes.ACCOUNT_NOT_FOUND.code)

    const { id, firstName } = user

    return this.createTokens({ id, firstName, email: user.email, schemakey: account.schemakey, accountId: user.accountId })
  }

  createTokens = ({ id, firstName, email, schemakey, accountId }: { id: number, firstName: string, email: string, schemakey: string, accountId: number }) => {
    return jwt.sign({ id, email, firstName, schemakey }, SECRET_KEY)
  }
}
