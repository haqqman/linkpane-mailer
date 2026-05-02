# @linkpane/sdk

Linkpane Mailer is a hosted form and email capture service by Haqqman. It allows you to collect form submissions and newsletter signups without building, deploying, or maintaining your own backend.

Linkpane Mailer provides:
- Hosted form endpoints
- Inbox for form submissions
- Email notifications
- Newsletter subscription handling
- Simple SDKs for frontend integration

Learn more at `https://linkpane.com/mailer-forms`

This repository contains the official SDKs for interacting with Linkpane Mailer endpoints.

## Install

```bash
npm install @linkpane/sdk
```

## Usage

```ts
import { submitForm, subscribeNewsletter } from '@linkpane/sdk'

await submitForm({
  pid: '12345',
  slug: 'contact-me',
  data: { firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com' }
})

await subscribeNewsletter({
  username: 'my-newsletter',
  data: { email: 'subscriber@example.com' }
})
```
## Which Package Should I Use?

- **I want all** → `@linkpane/sdk`
- **I want to submit a custom contact/lead form** → `@linkpane/mailer-post`
- **I want to add newsletter subscribers** → `@linkpane/newsletter-subscribe`

## Field Naming & Labels (Form Submissions)

For form submissions, Linkpane uses the **keys** in your `data` object as the labels in your inbox.
- **Format names as labels**: Use keys like `Phone Number` or `Project Type` to have them appear correctly in your dashboard.
- **Reserved Keys**: `email`, `firstName`, and `lastName` are reserved and required.

## Required Fields (Quick Guide)

**Mailer form submissions require:**
- `email`, `firstName`, and `lastName`.

**Newsletter subscriptions require:**
- `email` and `firstName`. (`lastName` is optional).