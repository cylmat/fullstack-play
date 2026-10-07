import jwt from 'jsonwebtoken';
import fs from 'fs'
import { getMemoryUserByUsername } from './memory_user.service.ts';

/**
 * @doc https://www.jwt.io/
 * @doc JWE (JSON Web Encryption) RFC-7516: https://datatracker.ietf.org/doc/html/rfc7516
 */
export default class authService {

    public static getTokenForUsername(username: string) {
        let memoryUser = getMemoryUserByUsername(username)

        if (!memoryUser) {
            throw new Error(`Error: User with username '${username}' not found in memory`)
        }

        var privateKey = fs.readFileSync('/var/www/application/config/keys/private.pem');
        const signature = jwt.sign(
            {
                payload: {
                    "username": memoryUser.username,
                    "roles": memoryUser.roles
                },
                exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration,
                aud: 'urn:foo',
                iss: 'MY'
            },
            privateKey,
            { algorithm: 'RS256' }
        );
        return signature;
    }

    public static verifyToken(token: string): object|false {
        try {
            var publicKey = fs.readFileSync('/var/www/application/config/keys/public.pem');
            let config = {
                audience: /urn:f[o]{2}/,
                issuer: 'MY'
            }
            return jwt.verify(token, publicKey, config) as object;
        } catch (err: any) {
            console.error('Invalid token: ', err.message);
            return false;
        }
    }

    //

    public static getTokenTest() {
        // jwt.sign: (payload, secretKey, options, callback)
        var privateKey = fs.readFileSync('/var/www/application/config/keys/private.pem');
        const signature = jwt.sign(
            {
                payload: 'h. jon benjamin',
                exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration,
                aud: 'urn:foo', // audience: application the JWT is created for
                iss: 'MY' // issuer (Firebase, etc..)
            },
            privateKey, //'has a van secret',
            { algorithm: 'RS256' }
          //  (err, token) => { console.log(token); return token; }
        );
        return signature;
    }
}
