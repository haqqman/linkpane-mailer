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
Linkpane Mailer uses an attribute-driven system to resolve field labels. This allows you to use code-friendly keys (like `firstName`) while displaying human-friendly labels (like "First Name") in your dashboard and emails.

When using `attachToForm`, labels are resolved in this priority:
1. **`data-label` attribute**: The highest priority. Use this for descriptive labels (e.g., `<input name="budget" data-label="Project Budget">`).
2. **`name` attribute**: If no `data-label` is present, the SDK uses the `name` attribute.
3. **`id` attribute**: Fallback if `name` is missing.
4. **Auto-Formatting**: If only a machine-readable key is found (e.g., `firstName`), the SDK auto-formats it to "First Name".

### Required Fields
For the **Contacts** feature and email identification, the following core fields are required:
- **Email**: `email` (Aliases: `email_address`, `emailAddress`)
- **First Name**: `firstName` (Aliases: `first_name`, `fname`)
- **Last Name**: `lastName` (Aliases: `last_name`, `lname`)

*Note: While the SDK and API support these aliases for the Contacts feature, we recommend using the standard camelCase keys for consistency.*

### Custom Fields
Any additional fields (e.g., `message`, `company`) will be captured. If you want a custom label for these fields, use the `data-label` attribute in your HTML or pass a `_labels` object if using `submitForm` manually.


### Origin Rules
For server-side usage, you must set an `Origin` header that matches the form’s
`source_url`. For mobile apps, submit through your backend proxy to satisfy
Linkpane’s Origin checks.
