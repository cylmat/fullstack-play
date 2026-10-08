import { aiController } from '#app/controllers/ai.controller.ts';

describe('aiController Integration Tests', () => {
    test('aiController should be defined', () => {
        expect(aiController).toBeDefined()
    })

    test('aiController should have a postChat method', () => {
        expect(aiController.postChat).toBeDefined()
    })
})
