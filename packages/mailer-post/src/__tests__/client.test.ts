import { describe, expect, it } from 'vitest'
import { buildActionUrl } from '../helpers'
import { submitForm } from '../client'

const dummyFetch = async (url: string, options: any) => {
  return {
    ok: true,
    status: 200,
    headers: {
      get: (name: string) => (name.toLowerCase() === 'content-type' ? 'application/json' : null),
    },
    json: async () => ({ message: 'Form submitted successfully!' }),
  }
}

describe('buildActionUrl', () => {
  it('builds the correct endpoint', () => {
    const url = buildActionUrl({
      apiBaseUrl: 'https://api.linkpane.com/',
      pid: '123',
      slug: 'contact-me',
    })
    expect(url).toBe('https://api.linkpane.com/mailer/123/form/contact-me')
  })
})

describe('submitForm', () => {
  it('returns ok for successful submission', async () => {
    const result = await submitForm({
      apiBaseUrl: 'https://api.linkpane.com',
      pid: '123',
      slug: 'contact-me',
      data: { email: 'a@b.com', firstName: 'Ada', lastName: 'Lovelace' },
      fetch: dummyFetch as any,
    })
    expect(result.ok).toBe(true)
  })
})
