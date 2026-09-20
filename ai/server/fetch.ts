
export function fetchFromMcp(url: string, body: object) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json, text/event-stream",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}

export function parseSseData(raw: string) {
  const dataLine = raw
    .split("\n")
    .find((line) => line.startsWith("data:"));

  if (!dataLine) throw new Error("No data line found in SSE response");

  const jsonStr = dataLine.replace(/^data:\s*/, "");
  return JSON.parse(jsonStr);
}