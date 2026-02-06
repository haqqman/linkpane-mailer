"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const helpers_1 = require("../helpers");
const client_1 = require("../client");
const dummyFetch = async (url, options) => {
    return {
        ok: true,
        status: 200,
        headers: {
            get: (name) => (name.toLowerCase() === 'content-type' ? 'application/json' : null),
        },
        json: async () => ({ message: 'Form submitted successfully!' }),
    };
};
(0, vitest_1.describe)('buildActionUrl', () => {
    (0, vitest_1.it)('builds the correct endpoint', () => {
        const url = (0, helpers_1.buildActionUrl)({
            apiBaseUrl: 'https://api.linkpane.com/',
            pid: '123',
            slug: 'contact-me',
        });
        (0, vitest_1.expect)(url).toBe('https://api.linkpane.com/mailer/123/form/contact-me');
    });
});
(0, vitest_1.describe)('submitForm', () => {
    (0, vitest_1.it)('returns ok for successful submission', async () => {
        const result = await (0, client_1.submitForm)({
            apiBaseUrl: 'https://api.linkpane.com',
            pid: '123',
            slug: 'contact-me',
            data: { email: 'a@b.com', firstName: 'Ada', lastName: 'Lovelace' },
            fetch: dummyFetch,
        });
        (0, vitest_1.expect)(result.ok).toBe(true);
    });
});
//# sourceMappingURL=client.test.js.map