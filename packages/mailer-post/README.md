# @linkpane/mailer-post

Submission-only SDK for Linkpane Mailer forms.

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

- Required fields: `email`, `firstName`, `lastName`.
- For mobile apps, submit through your backend proxy to satisfy Origin rules.
