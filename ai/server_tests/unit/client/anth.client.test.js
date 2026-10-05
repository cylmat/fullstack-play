import anthropicClient from '#app/clients/anth.client.ts'


test('anthropicClient should be defined', () => {
  expect(anthropicClient).toBeDefined();
});

test('anthropicClient should return a promise', async () => {
  const result = anthropicClient('Test-prompt-client-1');

  expect(result).toBeInstanceOf(Promise);
  const resolvedResult = await result

  expect(resolvedResult).toEqual([
    {
      type: 'text',
      text: 'Réponse simulée',
    },
    {
      type: 'text',
      text: 'Mock with prompt as: ' + 'Please answer with 50 characters max.Test-prompt-client-1',
    }
  ]);
});
