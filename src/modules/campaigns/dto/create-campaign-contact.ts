export interface CreateCampaignContactDto {
  campaignId: number
  contactId: number
  status: string
  deliveryError?: string
}
