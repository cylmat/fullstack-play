
/**
 * Methods: FetchClient().get<T>(url, headers)
 *          FetchClient().post<T>(url, body, headers)
 *          FetchClient().put<T>(url, body, headers)
 *          FetchClient().delete<T>(url, headers)
 */
export class FetchClient {

    static get = async <T>(url: string, headers?: HeadersInit): Promise<T> => {
        const response = await fetch(url, { method: 'GET', headers });
        if (!response.ok) {
            throw new Error(`GET ${url} failed: ${response.status}`);
        }
        return response.json() as Promise<T>;
    };

    static post = async <T>(url: string, body?: unknown, headers?: HeadersInit): Promise<T> => {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            throw new Error(`POST ${url} failed: ${response.status}`);
        }
        return response.json() as Promise<T>;
    };

    static put = async <T>(url: string, body?: unknown, headers?: HeadersInit): Promise<T> => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            throw new Error(`PUT ${url} failed: ${response.status}`);
        }
        return response.json() as Promise<T>;
    };

    static delete = async <T>(url: string, headers?: HeadersInit): Promise<T> => {
        const response = await fetch(url, { method: 'DELETE', headers });
        if (!response.ok) {
            throw new Error(`DELETE ${url} failed: ${response.status}`);
        }
        return response.json() as Promise<T>;
    };
}
