# Linkpane SDKs

Linkpane Mailer is a hosted form and email capture service by Haqqman. It allows you to collect form submissions and newsletter signups without building, deploying, or maintaining your own backend.

Linkpane Mailer provides:
- Hosted form endpoints
- Inbox for form submissions
- Email notifications
- Newsletter subscription handling
- Simple SDKs for frontend integration

Learn more at `https://linkpane.com/mailer-forms`

This repository contains the official SDKs for interacting with Linkpane Mailer endpoints.

## Packages

Published packages:
- `@linkpane/sdk`: Aggregate SDK (mailer-post + newsletter-subscribe)
- `@linkpane/mailer-post`: Submission-only SDK for Mailer forms
- `@linkpane/newsletter-subscribe`: Subscribe-only SDK for Newsletter endpoints

Internal packages (not published):
- `@linkpane/mailer`: Mailer CRUD SDK (stub)
- `@linkpane/newsletter`: Newsletter CRUD SDK (stub)

## License

Apache-2.0. Linkpane is a product of Haqqman.

## Scripts

- `npm run build`
- `npm run test`

## Status

Implemented packages:
- `@linkpane/sdk` (aggregate)
- `@linkpane/mailer-post`
- `@linkpane/newsletter-subscribe`

## Install All (Aggregate SDK)

Use the aggregate package to get all public Linkpane SDKs in one install:

```bash
npm install @linkpane/sdk
```

Example:

```ts
import { submitForm, subscribeNewsletter } from '@linkpane/sdk'
```

## Which Package Should I Use?

- **I want all** → `@linkpane/sdk`
- **I want to submit a custom contact/lead form** → `@linkpane/mailer-post`
- **I want to add newsletter subscribers** → `@linkpane/newsletter-subscribe`

## Required Fields (Quick Guide)

Mailer form submissions require:
- `email`
- `firstName`
- `lastName`

Newsletter subscriptions typically require:
- `email`
Optional:
- `firstName`
- `lastName`

## Root Export Map (optional)

If you prefer a single root package for exports, you can expose a root export map
from `@linkpane/sdk` and keep per-package imports available.
