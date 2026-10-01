import anthropicService from '../../../server/services/anth.service.ts'; // import: syntax ESM

test('anthropicService should be defined', () => {
  expect(anthropicService).toBeDefined();
});

test('anthropicService should return an array of strings', async () => {
  const result = await anthropicService('Hello, world!');

  expect(Array.isArray(result)).toBe(true);
  for (const item of result) {
    expect(typeof item).toBe('string');
  }
});
