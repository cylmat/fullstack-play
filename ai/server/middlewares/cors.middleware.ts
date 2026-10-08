import { type Request, type Response, type NextFunction } from "express";

export default function corsMiddleware(req: Request, res: Response, next: NextFunction) {

    /** CORS */
    // Or use npm install cors and import it
    console.info('Middleware: CORS')

    res.header(
        'Access-Control-Allow-Origin', // Header only from server, don't send it client-side
        '*'
    );

    // Allow these headers
    res.header(
        'Access-Control-Allow-Headers',
        'Accept, Authorization, Content-Type, Origin, X-Requested-With'
    );

    // Réponse à la requête preflight
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
        return;
    }

    next();
}
