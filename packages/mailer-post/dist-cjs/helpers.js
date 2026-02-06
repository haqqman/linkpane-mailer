"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildActionUrl = buildActionUrl;
exports.serializeForm = serializeForm;
function buildActionUrl(params) {
    const base = params.apiBaseUrl.replace(/\/+$/, '');
    return `${base}/mailer/${encodeURIComponent(params.pid)}/form/${encodeURIComponent(params.slug)}`;
}
function serializeForm(form) {
    if (typeof FormData === 'undefined') {
        throw new Error('FormData is not available in this environment');
    }
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const existing = data[key];
            if (Array.isArray(existing)) {
                existing.push(value);
            }
            else {
                data[key] = [existing, value];
            }
            continue;
        }
        data[key] = value;
    }
    return data;
}
//# sourceMappingURL=helpers.js.map