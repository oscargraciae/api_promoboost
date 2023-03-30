import { User } from '../../entities/user.entity'

export class UserService {
  async create ({ firstName, lastName, email, password, accountId }: { firstName: string, lastName: string, email: string, password: string, accountId: number }) {
    return await User.create({ firstName, lastName, email, password, accountId })
  }

  async get (id: number) {
    return await User.findByPk(id)
  }

  async getByEmail (email: string) {
    return await User.findOne({ where: { email } })
  }
}
