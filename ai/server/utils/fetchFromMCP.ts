export function fetchFromMCP(url: string, body: object) {
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/event-stream',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}
