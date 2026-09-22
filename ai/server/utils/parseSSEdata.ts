export function parseSSEData(raw: string) {
    const dataLine = raw.split('\n').find((line) => line.startsWith('data:'));

    if (!dataLine) throw new Error('No data line found in SSE response');

    const jsonStr = dataLine.replace(/^data:\s*/, '');
    return JSON.parse(jsonStr);
}
