// export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production'
export const STRIPE_TOKEN: string = process.env.STRIPE_TOKEN!

export const SENDGRID_TOKEN: string = process.env.SENDGRID_TOKEN!

export const HUBSPOT_TOKEN: string = process.env.HUBSPOT_TOKEN!

export const TWILIO_ACCOUNT_SID: string = process.env.TWILIO_ACCOUNT_SID!
export const TWILIO_AUTH_TOKEN: string = process.env.TWILIO_AUTH_TOKEN!
export const TWILIO_PHONE_NUMBER: string = process.env.TWILIO_PHONE_NUMBER!

export const ONESIGAL_APP_ID: string = process.env.ONESIGAL_APP_ID!
export const ONESIGAL_API_KEY: string = process.env.ONESIGAL_API_KEY!

export const ROLE_ADMIN: number = 1
export const ROLE_POLLSTER: number = 2

export const TRIAL_DAYS: number = isProd ? 14 : 4

export const SURVEY_STATUS_ACTIVE = 1
export const SURVEY_STATUS_DESACTIVE = 2

export const SECRET_KEY = 'secretpass_promoboost'
