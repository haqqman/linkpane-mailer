# @linkpane/newsletter-subscribe

Subscribe-only SDK for Linkpane Newsletter endpoints.

## Install

```bash
npm install @linkpane/newsletter-subscribe
```

## Usage

```ts
import { subscribeNewsletter } from '@linkpane/newsletter-subscribe'

const result = await subscribeNewsletter({
  apiBaseUrl: 'https://api.linkpane.com',
  username: 'my-newsletter',
  data: {
    email: 'subscriber@example.com',
    firstName: 'Ada',
    lastName: 'Lovelace'
  }
})

if (!result.ok) {
  console.error(result.message, result.errors)
}
```

## Notes

- For browser usage, ensure the request Origin matches the configured source domain.
- You can supply a custom `fetch` for server environments.
