jest.mock("../server/clients/anth.agent.wrapper", () => ({
  query: jest.fn()
}));


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
