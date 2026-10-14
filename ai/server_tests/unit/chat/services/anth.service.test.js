import anthropicService, { ANTHROPIC_TYPE_CLIENT, ANTHROPIC_TYPE_AGENT } from '#app/services/anthropic.service.ts'; // import: syntax ESM

jest.mock('#app/clients/anth.client.ts', () => {
    return (prompt) => [
        { type: 'text', text: 'Mock with prompt as: '+prompt },
        { type: 'text', text: 'ddd' }
    ]
});

describe('anthropicService', () => {

  test('anthropicService should be defined', () => {
    expect(anthropicService).toBeDefined();
  });

  test('anthropicService CLIENT mode, should return an array of strings', async () => {
    const result = await anthropicService('Hello, world!', ANTHROPIC_TYPE_CLIENT);

    expect(Array.isArray(result['messages'])).toBe(true);
    for (const item of result['messages']) {
      expect(typeof item).toBe('string');
    }

    expect(result['messages'][0]).toBe('Mock with prompt as: Hello, world!');
  });

  // test('anthropicService AGENT mode, should return an array of strings', async () => {
  //   const result = await anthropicService('Hello, world!', ANTHROPIC_TYPE_AGENT);

  //   expect(Array.isArray(result['messages'])).toBe(true);
  //   for (const item of result['messages']) {
  //     expect(typeof item).toBe('string');
  //   }

  //   // Since the agent is not mocked, we just check that messages array exists
  //   expect(result['messages']).toBeDefined();
  // });

});
