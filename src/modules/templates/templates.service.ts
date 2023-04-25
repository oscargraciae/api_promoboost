import { Templates } from '../../entities/templates.entity'

export class TemplateService {
  constructor (schemakey: string) {
    this.schemakey = schemakey
  }

  private readonly schemakey: string

  async getTemplates (): Promise<any> {
    return await Templates.schema(this.schemakey).findAll()
  }

  async getTemplateById (id: number): Promise<any> {
    return await Templates.schema(this.schemakey).findByPk(id)
  }

  async createTemplate (template: any): Promise<any> {
    return await Templates.schema(this.schemakey).create(template)
  }

  async updateTemplate (id: number, template: any): Promise<any> {
    return await Templates.schema(this.schemakey).update(template, { where: { id } })
  }

  async deleteTemplate (id: number): Promise<any> {
    return await Templates.schema(this.schemakey).destroy({ where: { id } })
  }
}
