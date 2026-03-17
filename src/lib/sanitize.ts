import DOMPurify from "dompurify";

// Sanitize a string to prevent XSS when rendering user-generated content
export function sanitizeText(input: string): string {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

// Sanitize all string fields in a form data object before sending to the API
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
    const sanitized = { ...data };

    for (const key of Object.keys(sanitized)) {
        const value = sanitized[key];

        if (typeof value === "string") {
            (sanitized as Record<string, unknown>)[key] = sanitizeText(value);
        }
    }

    return sanitized;
}
