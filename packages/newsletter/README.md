# @linkpane/newsletter

Newsletter endpoint SDK for Linkpane.

## Install

```bash
npm install @linkpane/newsletter
```

## Usage

```ts
import {
  createNewsletterEndpoint,
  getNewsletterEndpoint,
  getNewsletterConfiguration,
  updateNewsletterConfiguration,
  manageNewsletterFooter,
  subscribeNewsletter,
} from '@linkpane/newsletter'

await createNewsletterEndpoint({
  apiBaseUrl: 'https://api.linkpane.com',
  profileId: 'profile-id',
  data: {
    username: 'my-newsletter',
    sourceDomain: 'example.com'
  }
})

await subscribeNewsletter({
  apiBaseUrl: 'https://api.linkpane.com',
  username: 'my-newsletter',
  data: {
    email: 'subscriber@example.com',
    firstName: 'Ada',
    lastName: 'Lovelace'
  }
})
```

## Notes

- All functions accept an optional `fetch` override for server environments.
- For browser usage, ensure the request Origin matches the configured source domain.
