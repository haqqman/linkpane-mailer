export type SubmissionMode = 'json' | 'redirect';
export type SubmitFormParams = {
    apiBaseUrl: string;
    pid: string;
    slug: string;
    data: Record<string, any>;
    mode?: SubmissionMode;
    headers?: Record<string, string>;
    fetch?: typeof fetch;
    validateRequired?: boolean;
};
export type SubmitFormResult = {
    ok: true;
    message: string;
    status: number;
} | {
    ok: false;
    message: string;
    status?: number;
    errors?: any;
};
export type AttachToFormOptions = Omit<SubmitFormParams, 'data'> & {
    onSuccess?: (result: SubmitFormResult) => void;
    onError?: (result: SubmitFormResult) => void;
    honeypotField?: string;
};
//# sourceMappingURL=types.d.ts.map