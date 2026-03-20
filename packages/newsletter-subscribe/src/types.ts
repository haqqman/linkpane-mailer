export type SubscribeNewsletterParams = {
  apiBaseUrl?: string
  username: string
  data: Record<string, any>
  headers?: Record<string, string>
  fetch?: typeof fetch
}

export type NewsletterSubscribeResult =
  | { ok: true; message?: string; status: number; data?: any }
  | { ok: false; message: string; status?: number; errors?: any }
