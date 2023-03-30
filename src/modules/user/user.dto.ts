export interface CreateUserDTO {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface UserTokenDTO {
  id: number
  email: string
  firstName: string
  schemakey: string
  timezone: string
  roleId: number
}
