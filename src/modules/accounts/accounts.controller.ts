import { NextFunction, Request, Response } from 'express'

import { Account } from '../../entities/account.entity'
import AccountService from './accounts.service'

export class AccountController {
  static async get (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { schemakey }: any = req?.user

      const account = await new AccountService(schemakey).getOrganization()

      res.json(account)
    } catch (error) {
      next(error)
    }
  }

  static async create (req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const token = await new AccountService().create({ ...req.body })

      res.json({ token })
    } catch (error) {
      next(error)
    }
  };

  static migration (_: Request, res: Response, next: NextFunction) {
    Account.findAll().then((organization: any) => {
      organization.forEach((element: any) => {
        if (element.schemakey !== '' || element.schemakey !== null) {
          new AccountService(element.schemakey).migrations().then((result: any) => {
            console.log('result', result)
          }).catch((error: any) => {
            console.log('error', error)
          })
        }
      })
      res.json({ success: true })
    }).catch((error: any) => {
      next(error)
    })
  };
}
