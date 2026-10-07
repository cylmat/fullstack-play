/**
 * Methods: FetchClient().get<T>(url, headers)
 *          FetchClient().post<T>(url, body, headers)
 *          FetchClient().put<T>(url, body, headers)
 *          FetchClient().delete<T>(url, headers)
 */
export class FetchClient {
    private static readonly apiHost: string = import.meta.env.VITE_API_BACKEND_URL

    static get = async <T>(url: string, query?: string, headers?: HeadersInit): Promise<T> => {
        headers = { 'Content-Type': 'application/json', ...headers }

        const response = await fetch(`${this.apiHost}${url}${query ? `?${query}` : ''}`, { method: 'GET', headers })
        if (!response.ok) {
            throw new Error(`GET ${url} failed: ${response.status}`)
        }
        return response.json() as Promise<T>
    }

    static post = async <T>(
        url: string,
        body?: any,
        headers?: HeadersInit
    ): Promise<T> => {
        headers = { 'Content-Type': 'application/json', ...headers }
        let postBody = body !== undefined ? JSON.stringify(body) : undefined
        const response = await fetch(`${this.apiHost}${url}`, {
            method: 'POST',
            headers,
            body: postBody
        })
        if (!response.ok) {
            throw new Error(`POST ${url} failed: ${response.status}`)
        }
        return response.json() as Promise<T>
    }

    static put = async <T>(
        url: string,
        body?: any,
        headers?: HeadersInit
    ): Promise<T> => {
        headers = { 'Content-Type': 'application/json', ...headers }
        let putBody = body !== undefined ? JSON.stringify(body) : undefined
        const response = await fetch(`${this.apiHost}${url}`, {
            method: 'PUT',
            headers,
            body: putBody
        })
        if (!response.ok) {
            throw new Error(`PUT ${url} failed: ${response.status}`)
        }
        return response.json() as Promise<T>
    }

    static delete = async <T>(
        url: string,
        headers?: HeadersInit
    ): Promise<T> => {
        headers = { 'Content-Type': 'application/json', ...headers }
        const response = await fetch(`${this.apiHost}${url}`, { method: 'DELETE', headers })
        if (!response.ok) {
            throw new Error(`DELETE ${url} failed: ${response.status}`)
        }
        return response.json() as Promise<T>
    }
}
