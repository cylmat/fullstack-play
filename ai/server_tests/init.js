

// jest.mock('@app/clients/anth.agent.ts', () => {
//     return () => 'aaa'
// });


jest.mock('@anthropic-ai/claude-agent-sdk', () => {
    // mock client.messages.create({ ... })
    // let mockedCreateResponse = jest.fn().mockResolvedValue({
    //     content: [
    //         {
    //             type: 'text',
    //             text: 'Réponse simulée',
    //         }
    //     ]
    // });

    // return jest.fn().blop(() => 1)

    // return jest.fn().mockImplementation(() => ({
    //     messages: {
    //         sample: jest.fn().mockResolvedValue({}),
    //         create: mockedCreateResponse,
    //     }
    // }))
});


jest.mock('@anthropic-ai/sdk', () => {
    // mock client.messages.create({ ... })
    const createMock = {
        sample: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockImplementation((createConfiguration) => ({
            content: [
                { type: 'text', text: 'Réponse simulée' },
                { type: 'text', text: 'Mock with prompt as: ' + createConfiguration.messages[0].content },
            ],
        })),
    };

    return jest.fn().mockImplementation((anthropicConfig) => ({
         messages: createMock
    }))
});