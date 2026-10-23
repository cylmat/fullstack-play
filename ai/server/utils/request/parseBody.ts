export function getParsedBodyErrors(body: object, allowedKeys?: string[]): string[] {
    const parsed = body

    const errors: string[] = [];
    if (allowedKeys) {
        for (const key of Object.keys(parsed)) {
            if (!allowedKeys.includes(key)) {
                errors.push(key);
            }
        }
    }

    return errors;
}