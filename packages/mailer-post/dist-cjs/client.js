"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitForm = submitForm;
exports.attachToForm = attachToForm;
const helpers_1 = require("./helpers");
const REQUIRED_FIELDS = ['email', 'firstName', 'lastName'];
function validateRequiredFields(data) {
    const missing = REQUIRED_FIELDS.filter((field) => {
        const value = data[field];
        if (value === null || typeof value === 'undefined')
            return true;
        if (typeof value === 'string' && value.trim().length === 0)
            return true;
        return false;
    });
    if (missing.length === 0)
        return null;
    return {
        message: 'Missing required fields',
        fields: missing,
    };
}
function getFetchImpl(explicitFetch) {
    if (explicitFetch)
        return explicitFetch;
    if (typeof fetch !== 'undefined')
        return fetch;
    return null;
}
async function submitForm(params) {
    const { apiBaseUrl = 'https://api.linkpane.com/v2', pid, slug, data, mode = 'json', headers, fetch: explicitFetch, validateRequired = true, } = params;
    if (validateRequired) {
        const validationError = validateRequiredFields(data);
        if (validationError) {
            return { ok: false, message: validationError.message, errors: validationError };
        }
    }
    const fetchImpl = getFetchImpl(explicitFetch);
    if (!fetchImpl) {
        return {
            ok: false,
            message: 'Fetch API is not available. Provide a fetch implementation via options.fetch.',
        };
    }
    const url = (0, helpers_1.buildActionUrl)({ apiBaseUrl, pid, slug });
    const requestHeaders = {
        'Content-Type': 'application/json',
        ...headers,
    };
    if (mode === 'json') {
        requestHeaders.Accept = 'application/json';
        requestHeaders['X-Requested-With'] = 'XMLHttpRequest';
    }
    try {
        const response = await fetchImpl(url, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(data),
        });
        const contentType = response.headers?.get?.('content-type') || '';
        if (contentType.includes('application/json')) {
            const payload = await response.json().catch(() => null);
            if (!response.ok) {
                return {
                    ok: false,
                    message: payload?.message || 'Form submission failed',
                    errors: payload?.errors,
                    status: response.status,
                };
            }
            return {
                ok: true,
                message: payload?.message || 'Form submitted successfully',
                status: response.status,
            };
        }
        if (!response.ok) {
            return {
                ok: false,
                message: 'Form submission failed',
                status: response.status,
            };
        }
        return { ok: true, message: 'Form submitted successfully', status: response.status };
    }
    catch (error) {
        return {
            ok: false,
            message: error?.message || 'Form submission failed',
        };
    }
}
function attachToForm(form, options) {
    if (!form || typeof form.addEventListener !== 'function') {
        throw new Error('attachToForm expects a valid HTMLFormElement');
    }
    const handler = async (event) => {
        event.preventDefault();
        const data = (0, helpers_1.serializeForm)(form);
        const honeypotField = options.honeypotField;
        if (honeypotField && typeof data[honeypotField] === 'undefined') {
            data[honeypotField] = '';
        }
        const result = await submitForm({
            apiBaseUrl: options.apiBaseUrl,
            pid: options.pid,
            slug: options.slug,
            data,
            mode: options.mode,
            headers: options.headers,
            fetch: options.fetch,
            validateRequired: options.validateRequired,
        });
        if (result.ok) {
            options.onSuccess?.(result);
        }
        else {
            options.onError?.(result);
        }
    };
    form.addEventListener('submit', handler);
    return () => form.removeEventListener('submit', handler);
}
//# sourceMappingURL=client.js.map