import { secureController } from '#app/controllers/secure.controller.ts';
import { getMockReq, getMockRes } from '@jest-mock/express'

describe('secureController Integration Tests', () => {
    test('secureController should be defined', () => {
        expect(secureController).toBeDefined()
    })

    test('secureController should have a getToken method', () => {
        expect(secureController.getToken).toBeDefined()
    })

    test('secureController.getToken should return a token', async () => {

        const req = getMockReq({ query: { username: 'user-username' } })
        const { res } = getMockRes()
        res.json.mockImplementation((data) => data);

        const token = await secureController.getToken(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(token).toBeDefined()
        expect(typeof token).toBe('object')
        expect(token).toHaveProperty('jwt')
    })

    test('secureController.getCurrentUser should return the current user', async () => {
        const _req = getMockReq({ query: { username: 'user-username' } })
        const { res: _res } = getMockRes()
        _res.json.mockImplementation((data) => data);

        const token = await secureController.getToken(_req, _res)

        const req = getMockReq()
        req.header = (key) => { return key === 'Authorization' ? `Bearer ${token.jwt}` : undefined }
        const { res } = getMockRes()
        res.json.mockImplementation((data) => data);

        const currentUser = await secureController.getCurrentUser(req, res)
        expect(currentUser).toBeDefined()
        expect(typeof currentUser).toBe('object')
        expect(currentUser.username).toBe('user-username')
    })
})
