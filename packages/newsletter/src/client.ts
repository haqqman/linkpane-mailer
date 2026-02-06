import {
  CreateNewsletterEndpointParams,
  GetNewsletterConfigParams,
  GetNewsletterEndpointParams,
  ManageNewsletterFooterParams,
  NewsletterResult,
  SubscribeNewsletterParams,
  UpdateNewsletterConfigParams,
} from './types'

function getFetchImpl(explicitFetch?: typeof fetch) {
  if (explicitFetch) return explicitFetch
  if (typeof fetch !== 'undefined') return fetch
  return null
}

async function requestJson(
  url: string,
  options: RequestInit & { headers?: Record<string, string> },
  explicitFetch?: typeof fetch
): Promise<NewsletterResult> {
  const fetchImpl = getFetchImpl(explicitFetch)
  if (!fetchImpl) {
    return {
      ok: false,
      message: 'Fetch API is not available. Provide a fetch implementation via options.fetch.',
    }
  }

  try {
    const response = await fetchImpl(url, options)
    const contentType = response.headers?.get?.('content-type') || ''

    if (contentType.includes('application/json')) {
      const payload = await response.json().catch(() => null)
      if (!response.ok) {
        return {
          ok: false,
          message: payload?.message || 'Request failed',
          errors: payload?.errors,
          status: response.status,
        }
      }
      return { ok: true, message: payload?.message, status: response.status, data: payload }
    }

    if (!response.ok) {
      return { ok: false, message: 'Request failed', status: response.status }
    }

    return { ok: true, status: response.status }
  } catch (error: any) {
    return { ok: false, message: error?.message || 'Request failed' }
  }
}

export async function createNewsletterEndpoint(params: CreateNewsletterEndpointParams) {
  const url = `${params.apiBaseUrl.replace(/\/+$/, '')}/mailer/newsletter/create-endpoint/${encodeURIComponent(
    params.profileId
  )}`

  return requestJson(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...params.headers,
      },
      body: JSON.stringify(params.data),
    },
    params.fetch
  )
}

export async function getNewsletterEndpoint(params: GetNewsletterEndpointParams) {
  const url = `${params.apiBaseUrl.replace(/\/+$/, '')}/mailer/newsletter/get-endpoint/${encodeURIComponent(
    params.profileId
  )}`

  return requestJson(
    url,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...params.headers,
      },
    },
    params.fetch
  )
}

export async function getNewsletterConfiguration(params: GetNewsletterConfigParams) {
  const url = `${params.apiBaseUrl.replace(/\/+$/, '')}/mailer/newsletter/configure/${encodeURIComponent(
    params.profileId
  )}`

  return requestJson(
    url,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...params.headers,
      },
    },
    params.fetch
  )
}

export async function updateNewsletterConfiguration(params: UpdateNewsletterConfigParams) {
  const url = `${params.apiBaseUrl.replace(/\/+$/, '')}/mailer/newsletter/configure/${encodeURIComponent(
    params.profileId
  )}`

  return requestJson(
    url,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...params.headers,
      },
      body: JSON.stringify(params.data),
    },
    params.fetch
  )
}

export async function manageNewsletterFooter(params: ManageNewsletterFooterParams) {
  const url = `${params.apiBaseUrl.replace(/\/+$/, '')}/mailer/newsletter/manage-footer/${encodeURIComponent(
    params.profileId
  )}`

  return requestJson(
    url,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...params.headers,
      },
      body: JSON.stringify(params.data),
    },
    params.fetch
  )
}

export async function subscribeNewsletter(params: SubscribeNewsletterParams) {
  const url = `${params.apiBaseUrl.replace(/\/+$/, '')}/mailer/newsletter/${encodeURIComponent(
    params.username
  )}/subscribe`

  return requestJson(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...params.headers,
      },
      body: JSON.stringify(params.data),
    },
    params.fetch
  )
}
