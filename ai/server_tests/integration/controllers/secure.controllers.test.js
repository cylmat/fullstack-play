import { secureController } from '#app/controllers/secure.controller.ts';

describe('secureController Integration Tests', () => {
    test('secureController should be defined', () => {
        expect(secureController).toBeDefined()
    })

    test('secureController should have a getToken method', () => {
        expect(secureController.getToken).toBeDefined()
    })

    test('secureController.getToken should return a token', async () => {
        const request = {
            query: { username: 'user-username' }
        }
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockResolvedValue({ jwt: 'mocked-jwt' })
        }
        const token = await secureController.getToken(request, response)
        expect(token).toBeDefined()
        expect(typeof token).toBe('object')
        expect(token).toHaveProperty('jwt')
    })
})
