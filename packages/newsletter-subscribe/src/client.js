"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeNewsletter = subscribeNewsletter;
function getFetchImpl(explicitFetch) {
    if (explicitFetch)
        return explicitFetch;
    if (typeof fetch !== 'undefined')
        return fetch;
    return null;
}
async function subscribeNewsletter(params) {
    const fetchImpl = getFetchImpl(params.fetch);
    if (!fetchImpl) {
        return {
            ok: false,
            message: 'Fetch API is not available. Provide a fetch implementation via options.fetch.',
        };
    }
    const url = `${params.apiBaseUrl.replace(/\/+$/, '')}/mailer/newsletter/${encodeURIComponent(params.username)}/subscribe`;
    try {
        const response = await fetchImpl(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...params.headers,
            },
            body: JSON.stringify(params.data),
        });
        const contentType = response.headers?.get?.('content-type') || '';
        if (contentType.includes('application/json')) {
            const payload = await response.json().catch(() => null);
            if (!response.ok) {
                return {
                    ok: false,
                    message: payload?.message || 'Subscription failed',
                    errors: payload?.errors,
                    status: response.status,
                };
            }
            return { ok: true, message: payload?.message, status: response.status, data: payload };
        }
        if (!response.ok) {
            return { ok: false, message: 'Subscription failed', status: response.status };
        }
        return { ok: true, status: response.status };
    }
    catch (error) {
        return { ok: false, message: error?.message || 'Subscription failed' };
    }
}
//# sourceMappingURL=client.js.map