import jwt from 'jsonwebtoken';

export default class authService {

    public static getToken() {
        // jwt.sign: (payload, secretKey, options, callback)
        const signature = jwt.sign(
            {
                payload: 'h. jon benjamin',
                exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration,
                aud: /urn:f[o]{2}/, // audience: application the JWT is created for
                iss: 'MY' // issuer (Firebase, etc..)
            },
            'has a van secret',
            { algorithm: 'HS256' }
          //  (err, token) => { console.log(token); return token; }
        );
        return signature;
    }

    public static verifyToken(token: string): object|false {
        try {
            return jwt.verify(token, 'has a van secret') as object;
        } catch (err) {
            console.error('Invalid token');
            return false;
        }
    }
}
