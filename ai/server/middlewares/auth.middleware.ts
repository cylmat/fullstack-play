import { type Request, type Response, type NextFunction } from "express";
import authService from "../services/auth.service.ts";

/**
 * @doc https://expressjs.com/en/5x/guide/using-middleware/
 * @doc https://expressjs.com/en/5x/guide/writing-middleware/
 */

// @doc https://swagger.io/docs/specification/v3_0/authentication/bearer-authentication/
// Bearer token example: Authorization: Bearer <token>

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    let url = req.originalUrl
    if (!url.match(/^\/api/)) {
        console.log(url + " doesn't match /api")
        next()
        return
    }

    console.log('Middleware: AUTH on /api')

    let auth = req.header('Authorization') ?? ''
    let token = auth.replace('Bearer ', '')

    console.log('Verifying token...')

    let verify = authService.verifyToken(token)
    if (!verify) {
        res.status(401).json({ message: 'Unauthorized token provided' });
        return;
    }

    console.log('Token verified successfully');

    next()
}
