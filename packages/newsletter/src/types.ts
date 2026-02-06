export type NewsletterSettings = {
  sourceDomain?: string
  senderName?: string
  senderEmail?: string
  primaryNotificationEmail?: string
  secondaryNotificationEmail?: string
  secondaryNotificationStatus?: boolean
  primaryNotificationStatus?: boolean
  successRedirectUrl?: string
  errorRedirectUrl?: string
}

export type NewsletterEndpoint = {
  _id?: string
  profile?: string
  username?: string
  endpoint?: string
  settings?: NewsletterSettings
  createdAt?: string
  updatedAt?: string
}

export type NewsletterFooter = {
  address?: string
  phone?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
}

export type CreateNewsletterEndpointParams = {
  apiBaseUrl: string
  profileId: string
  data: Record<string, any>
  headers?: Record<string, string>
  fetch?: typeof fetch
}

export type UpdateNewsletterConfigParams = {
  apiBaseUrl: string
  profileId: string
  data: NewsletterSettings
  headers?: Record<string, string>
  fetch?: typeof fetch
}

export type ManageNewsletterFooterParams = {
  apiBaseUrl: string
  profileId: string
  data: NewsletterFooter
  headers?: Record<string, string>
  fetch?: typeof fetch
}

export type GetNewsletterEndpointParams = {
  apiBaseUrl: string
  profileId: string
  headers?: Record<string, string>
  fetch?: typeof fetch
}

export type GetNewsletterConfigParams = GetNewsletterEndpointParams

export type SubscribeNewsletterParams = {
  apiBaseUrl: string
  username: string
  data: Record<string, any>
  headers?: Record<string, string>
  fetch?: typeof fetch
}

export type NewsletterResult =
  | { ok: true; message?: string; status: number; data?: any }
  | { ok: false; message: string; status?: number; errors?: any }
