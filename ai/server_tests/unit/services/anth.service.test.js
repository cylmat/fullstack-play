import anthropicService from '#app/services/anthropic.service.ts'; // import: syntax ESM

jest.mock('#app/clients/anth.client.ts', () => {
    return (prompt) => [
        { type: 'text', text: 'Mock with prompt as: '+prompt },
        { type: 'text', text: 'ddd' }
    ]
});

test('anthropicService should be defined', () => {
  expect(anthropicService).toBeDefined();
});

test('anthropicService CLIENT mode, should return an array of strings', async () => {
  const result = await anthropicService('Hello, world!', 'client');

  expect(Array.isArray(result['messages'])).toBe(true);
  for (const item of result['messages']) {
    expect(typeof item).toBe('string');
  }

  expect(result['messages'][0]).toBe('Mock with prompt as: Hello, world!');
});
