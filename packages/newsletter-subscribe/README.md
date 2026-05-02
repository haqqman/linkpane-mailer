# @linkpane/newsletter-subscribe

Subscribe-only SDK for Linkpane Newsletter endpoints. Use this to add email
subscribers without building your own newsletter backend.

Linkpane Mailer is a hosted form and email capture service by Haqqman. It allows you to collect form submissions and newsletter signups without building, deploying, or maintaining your own backend.

## Install

```bash
npm install @linkpane/newsletter-subscribe
```

## Usage

```ts
import { subscribeNewsletter } from '@linkpane/newsletter-subscribe'

const result = await subscribeNewsletter({
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

### Required Fields
- **email**: The subscriber's email address.
- **firstName**: The subscriber's first name.

### Optional Fields
- **lastName**: The subscriber's last name.

### Origin Rules
For browser usage, ensure the request Origin matches the configured source domain.
For server-side usage, you must set an `Origin` header that matches the configured
source domain.

### Server Usage
You can supply a custom `fetch` for server environments.
