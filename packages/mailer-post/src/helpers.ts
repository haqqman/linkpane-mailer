import { SubmitFormParams } from './types'

export function buildActionUrl(params: Pick<SubmitFormParams, 'apiBaseUrl' | 'pid' | 'slug'>) {
  const base = params.apiBaseUrl.replace(/\/+$/, '')
  return `${base}/mailer/${encodeURIComponent(params.pid)}/form/${encodeURIComponent(params.slug)}`
}

export function serializeForm(form: HTMLFormElement) {
  if (typeof FormData === 'undefined') {
    throw new Error('FormData is not available in this environment')
  }

  const formData = new FormData(form)
  const data: Record<string, any> = {}

  for (const [key, value] of formData.entries()) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const existing = data[key]
      if (Array.isArray(existing)) {
        existing.push(value)
      } else {
        data[key] = [existing, value]
      }
      continue
    }
    data[key] = value
  }

  return data
}
