export interface CreateOrganizationDTO {
  name: string
  phone: string
  firstName: string
  lastName: string
  email: string
  password: string
  // schenakey: string
  // country?: string
  // subscriptionTypeId: number
  // tokenCard?: string
  // Optional
  // timezone?: string
  // countryCode?: string
  // city?: string
  // IPAddress?: string
}

export interface CreateGlobalUserDTO {
  firstName: string
  lastName: string
  email: string
  organizationSchemaId: number
  isOwner: boolean
}
