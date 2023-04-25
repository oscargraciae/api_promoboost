import { Request, Response, NextFunction } from 'express'
import sequelize from '../../entities'

export class ReportController {
  static async getTransactionalMessagesReport (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user

      const results = await sequelize.query(`
        SELECT to_char(i, 'YYYY-MM-DD') as label, to_char(i, 'MM'), count(id) as total
        FROM generate_series(now() - INTERVAL '1 month', now(), '1 day') as i
        left join "${schemakey as string}"."messages" on (to_char(i, 'DD') = to_char(created_at, 'DD')
        and to_char(i, 'MM') = to_char(created_at, 'MM') and to_char(i, 'YYYY') = to_char(created_at, 'YYYY'))
        GROUP BY 1,2
        ORDER BY 1, 2 DESC
      `)

      res.json(results[0])
    } catch (error) {
      next(error)
    }
  }

  static async getCampaignsMessagesReport (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user

      const results = await sequelize.query(`
        SELECT to_char(i, 'YYYY-MM-DD') as label, to_char(i, 'MM'), count(id) as total
        FROM generate_series(now() - INTERVAL '1 month', now(), '1 day') as i
        left join "${schemakey as string}"."campaign_contacts" on (to_char(i, 'DD') = to_char(created_at, 'DD')
        and to_char(i, 'MM') = to_char(created_at, 'MM') and to_char(i, 'YYYY') = to_char(created_at, 'YYYY'))
        GROUP BY 1,2
        ORDER BY 1, 2 DESC
      `)

      res.json(results[0])
    } catch (error) {
      next(error)
    }
  }
}
