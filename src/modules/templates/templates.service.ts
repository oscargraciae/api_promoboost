import { Templates } from '../../entities/templates.entity'

export class TemplateService {
  constructor (schemakey: string) {
    this.schemakey = schemakey
  }

  private readonly schemakey: string

  async getTemplates (): Promise<any> {
    return await Templates.schema(this.schemakey).findAll()
  }

  async createTemplate (template: any): Promise<any> {
    return await Templates.schema(this.schemakey).create(template)
  }
}
