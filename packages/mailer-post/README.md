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
  pid: '12345',
  slug: 'contact-me',
  onSuccess: () => {},
  onError: () => {},
})
```

## Notes

### Field Naming & Labels
Linkpane Mailer uses the **keys** in your `data` object (or the `name` attributes in your HTML form) as the labels for submissions in your inbox.
- **Format names as labels**: Use readable keys like `Phone Number` or `Project Type` if you want them to appear exactly like that in your form submissions.
- **Reserved Keys**: `email`, `firstName`, and `lastName` are reserved and required for all submissions.

### Required Fields
- `email`: Used for reply-to and identifying the sender.
- `firstName`: Sender's first name.
- `lastName`: Sender's last name.

### Optional Fields
- Any additional fields (e.g., `message`, `phone`, `company`) will be captured and displayed using their key as the label.
- `redhat`: A reserved honeypot field. Keep this empty in your UI to prevent spam; if it contains data, the submission will be silently rejected.

### Origin Rules
For server-side usage, you must set an `Origin` header that matches the form’s
`source_url`. For mobile apps, submit through your backend proxy to satisfy
Linkpane’s Origin checks.
