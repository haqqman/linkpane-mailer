# @linkpane/sdk

Aggregate SDK that re-exports the public Linkpane packages.

## Install

```bash
npm install @linkpane/sdk
```

## Usage

```ts
import { submitForm, subscribeNewsletter } from '@linkpane/sdk'

await submitForm({
  apiBaseUrl: 'https://api.linkpane.com',
  pid: '12345',
  slug: 'contact-me',
  data: { firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com' }
})

await subscribeNewsletter({
  apiBaseUrl: 'https://api.linkpane.com',
  username: 'my-newsletter',
  data: { email: 'subscriber@example.com' }
})
```
