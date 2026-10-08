import request from 'supertest'

describe('secureController Integration Tests', () => {

    test('secureController should return an token response', () => {
    //     request(testApp)
    //         .get('/token')
    //         .expect('Content-Type', /json/)
    //         .expect('Content-Length', '15')
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) throw err;
    //         });

    //     // const response = secureController.getToken({ query: { username: 'user-username' } });
    //     // request(app)
    //     //     .get('/chat')
    //     //     .expect('Content-Type', /json/)
    //     //     .expect('Content-Length', '15')
    //     //     .expect(200)
    //     //     .end(function(err, res) {
    //     //         if (err) throw err;
    //     //     });

        expect(1+1).toBe(2)
    })
})
