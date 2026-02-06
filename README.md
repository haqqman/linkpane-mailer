# Linkpane Mailer SDKs

Monorepo for Linkpane Mailer SDK packages.

## Packages

Published packages:
- `@linkpane/mailer-post`: Submission-only SDK for Mailer forms
- `@linkpane/newsletter-subscribe`: Subscribe-only SDK for Newsletter endpoints
- `@linkpane/sdk`: Aggregate SDK (mailer-post + newsletter-subscribe)

Internal packages (not published):
- `@linkpane/mailer`: Mailer CRUD SDK (stub)
- `@linkpane/newsletter`: Newsletter CRUD SDK (stub)

## License

Apache-2.0. Linkpane is a product of Haqqman.

## Scripts

- `npm run build`
- `npm run test`

## Status

Only `@linkpane/mailer-post` is implemented at the moment.

## Install All (Aggregate SDK)

Use the aggregate package to get all public Linkpane SDKs in one install:

```bash
npm install @linkpane/sdk
```

Example:

```ts
import { submitForm, subscribeNewsletter } from '@linkpane/sdk'
```

## Root Export Map (optional)

If you prefer a single root package for exports, you can expose a root export map
from `@linkpane/sdk` and keep per-package imports available.
