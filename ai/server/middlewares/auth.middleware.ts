import { type Request, type Response, type NextFunction } from "express";
import authService from "../services/auth.service.ts";
import { Logger } from "#app/core/logger.ts";

/**
 * @doc https://expressjs.com/en/5x/guide/using-middleware/
 * @doc https://expressjs.com/en/5x/guide/writing-middleware/
 */

// @doc https://swagger.io/docs/specification/v3_0/authentication/bearer-authentication/
// Bearer token example: Authorization: Bearer <token>

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    let url = req.originalUrl
    if (!url.match(/^\/api/)) {
        Logger.info(url + " doesn't match /api")
        next()
        return
    }

    Logger.info('Middleware: AUTH on /api')
    // console.info('headers send:', req.headers)

    let auth = req.header('Authorization') ?? ''
    let token = auth.replace('Bearer ', '')

    Logger.info('Get headers, verifying token: ' + token.substring(0, 10) + '...', 'AUTH')

    let verify = authService.verifyToken(token)
    if (!verify) {
        res.status(401).json({ message: 'Unauthorized token provided' });
        return;
    }

    Logger.info('Token verified successfully', 'AUTH');

    next()
}
