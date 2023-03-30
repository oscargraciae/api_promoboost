import { NextFunction, Request, Response } from 'express'

import { User } from '../../entities/user.entity'
import { UserService } from './user.service'

export class UserController {
  static async getAll (req: Request & any, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req.user

      const where: any = {}

      const users = await User.schema(schemakey).findAll({ where: { isActive: true, ...where }, order: [['id', 'ASC']] })

      res.json(users)
    } catch (error) {
      next(error)
    }
  }

  static async getById (req: Request & any, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { schemakey }: any = req.user
      const user = await User.schema(schemakey).findOne({ where: { id } })

      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  // static async login (req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { email, password } = req.body

  //     const user = await User.findOne({ where: { email }, include: ['account'] })

  //     if (user == null) throw Error('Not found')

  //     const token = await new UserService(user!.account).auth({ email, password, timezone })
  //     res.status(200).json({ success: true, token })
  //   } catch (error) {
  //     next(error)
  //   }
  // };

  static async create (req: Request & any, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password, accountId } = req.body

      const user = await new UserService().create({ firstName, lastName, email, password, accountId })

      res.status(201).json({ success: true, user })
    } catch (error) {
      next(error)
    }
  }
}
