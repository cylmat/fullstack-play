import { secureController } from '#app/controllers/secure.controller.ts';
import { mockRequest, mockResponse } from 'mock-req-res';

describe('secureController Integration Tests', () => {
    test('secureController should be defined', () => {
        expect(secureController).toBeDefined()
    })

    test('secureController should have a getToken method', () => {
        expect(secureController.getToken).toBeDefined()
    })

    test('secureController.getToken should return a token', async () => {

        const req = mockRequest({ query: { username: 'user-username' } })
        const res = mockResponse({
            json: (data) => data
            // json: jest.fn().mockResolvedValue({ jwt: 'mocked-jwt' })
        })

        const token = await secureController.getToken(req, res)
        expect(res.status.calledWith(200)).toBe(true);
        expect(token).toBeDefined()
        expect(typeof token).toBe('object')
        expect(token).toHaveProperty('jwt')
    })

    test('secureController.getCurrentUser should return the current user', async () => {
        const _req = mockRequest({ query: { username: 'user-username' } })
        const _res = mockResponse({ json: (data) => data })

        const token = await secureController.getToken(_req, _res)

        const req = mockRequest()
        req.header = (key) => { return key === 'Authorization' ? `Bearer ${token.jwt}` : undefined }
        const res = mockResponse({ json: (data) => data })

        const currentUser = await secureController.getCurrentUser(req, res)
        expect(currentUser).toBeDefined()
        expect(typeof currentUser).toBe('object')
        expect(currentUser.user.username).toBe('user-username')

    })
})
