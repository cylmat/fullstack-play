import anthropicService from '../server/services/anth.service.ts'; // import: syntax ESM

jest.mock('@anthropic-ai/sdk', () => {
    // mock client.messages.create({ ... })
    let mockedCreateResponse = jest.fn().mockResolvedValue({
        content: [
            {
                type: 'text',
                text: 'Réponse simulée',
            }
        ]
    });
        
    return jest.fn().mockImplementation(() => ({
        messages: {
            sample: jest.fn().mockResolvedValue({}),
            create: mockedCreateResponse,
        }
    }))
});

// jest.mock('@anthropic-ai/sdk', () => {
//   return jest.fn().mockImplementation(() => ({
//     messages: {
//       create: jest.fn().mockResolvedValue({
//         content: [
//           {
//             type: 'text',
//             text: 'Réponse simulée',
//           },
//         ],
//       }),
//     },
//   }));
// });

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
