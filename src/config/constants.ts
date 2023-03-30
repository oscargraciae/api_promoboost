// export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production'
// export const STRIPE_TOKEN = process.env.STRIPE_TOKEN || 'pk_test_51IIfHnLDh9k7BA0krnxxx7vxCQIuBWV8HG6iS1IyuDEURijRXVcUHbd0D6kYQJkeecmptfY80DOG5mLBgE6oXcQ000Gkrouoys';
// export const STRIPE_TOKEN = process.env.STRIPE_TOKEN || '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';
export const STRIPE_TOKEN: string = process.env.STRIPE_TOKEN! // || 'sk_test_51IIfHnLDh9k7BA0kvLLQFFXL2yaOj6PFtKerOTTPcTFL14uvD6sAalnDa3JZR9AxV3SZsxJgMhZ0EBsjI1ElL3bC00K7JbntmX';

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
