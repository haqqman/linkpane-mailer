# @linkpane/mailer-post

Submission-only SDK for Linkpane Mailer forms. Use this when you want to post
form data to a Linkpane inbox endpoint without managing forms.

Linkpane Mailer is a hosted form and email capture service by Haqqman. It allows you to collect form submissions and newsletter signups without building, deploying, or maintaining your own backend.

## Install

```bash
npm install @linkpane/mailer-post
```

## Usage

```ts
import { submitForm } from '@linkpane/mailer-post'

const result = await submitForm({
  apiBaseUrl: 'https://api.linkpane.com',
  pid: '12345',
  slug: 'contact-me',
  data: {
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    message: 'Hello from my website'
  }
})

if (!result.ok) {
  console.error(result.message, result.errors)
}
```

## Browser Helper

```ts
import { attachToForm } from '@linkpane/mailer-post'

const form = document.querySelector('#contact-form')
attachToForm(form, {
  apiBaseUrl: 'https://api.linkpane.com',
  pid: '12345',
  slug: 'contact-me',
  onSuccess: () => {},
  onError: () => {},
})
```

## Notes

### Required Fields (enforced by Linkpane Mailer)
- `email`
- `firstName`
- `lastName`

### Optional Fields
- Any additional fields in your form (custom questions, phone, message, etc.)
- `redhat` (honeypot field; keep empty)

### Origin Rules
For server-side usage, you must set an `Origin` header that matches the form’s
`source_url`. For mobile apps, submit through your backend proxy to satisfy
Linkpane’s Origin checks.
