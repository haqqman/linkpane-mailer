import { SubmitFormParams } from './types'

export function buildActionUrl(params: Pick<SubmitFormParams, 'apiBaseUrl' | 'pid' | 'slug'>) {
  const base = params.apiBaseUrl ? String(params.apiBaseUrl) : 'https://api.linkpane.com/v2'
  return `${base.replace(/\/+$/, '')}/mailer/${encodeURIComponent(params.pid)}/form/${encodeURIComponent(params.slug)}`
}

export function formatLabel(str: string): string {
  if (!str) return ''
  return str
    .replace(/([A-Z])/g, ' $1') // insert a space before all caps
    .replace(/[_-]/g, ' ') // replace underscores and hyphens with spaces
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase()) // capitalize the first letter
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/\s+/g, ' ') // collapse multiple spaces
    .trim()
}

export function serializeForm(form: HTMLFormElement) {
  if (typeof FormData === 'undefined') {
    throw new Error('FormData is not available in this environment')
  }

  const formData = new FormData(form)
  const data: Record<string, any> = {}
  const labels: Record<string, string> = {}

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

  // Collect labels
  const elements = Array.from(form.elements) as (
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
  )[]

  elements.forEach((element) => {
    const name = element.name
    if (!name) return
    if (labels[name]) return

    const explicitLabel = element.getAttribute('data-label')
    const id = element.id

    // Priority 1: data-label
    // Priority 2: name (cleaned up)
    // Priority 3: id (cleaned up)
    let label = explicitLabel
    if (!label) {
      label = formatLabel(name || id)
    }

    if (label) {
      labels[name] = label
    }
  })

  return { ...data, _labels: labels }
}

