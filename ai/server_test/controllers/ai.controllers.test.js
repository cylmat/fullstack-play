import { aiController } from '../../server/controllers/ai.controller.ts';

test('aiController should be defined', () => {
    expect(aiController).toBeDefined()
})

test('aiController should have a postChat method', () => {
    expect(aiController.postChat).toBeDefined()
})
