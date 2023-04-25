import { Request, Response, NextFunction } from 'express'
import { TemplateService } from './templates.service'

export class TemplateController {
  static async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user

      const templates = await new TemplateService(schemakey).getTemplates()

      res.json(templates)
    } catch (error) {
      next(error)
    }
  }

  static async getById (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user
      const { id }: any = req.params

      const template = await new TemplateService(schemakey).getTemplateById(id)

      res.json(template)
    } catch (error) {
      next(error)
    }
  }

  static async create (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user

      await new TemplateService(schemakey).createTemplate(req.body)

      res.json({ message: 'Created' })
    } catch (error) {
      next(error)
    }
  }

  static async update (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user
      const { id }: any = req.params

      await new TemplateService(schemakey).updateTemplate(id, req.body)

      res.json({ message: 'Updated' })
    } catch (error) {
      next(error)
    }
  }

  static async delete (req: Request, res: Response, next: NextFunction) {
    try {
      const { schemakey }: any = req?.user
      const { id }: any = req.params

      await new TemplateService(schemakey).deleteTemplate(id)

      res.json({ message: 'Deleted' })
    } catch (error) {
      next(error)
    }
  }
}
