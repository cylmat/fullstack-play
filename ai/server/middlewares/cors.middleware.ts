import { type Request, type Response, type NextFunction } from "express";

export default function corsMiddleware(req: Request, res: Response, next: NextFunction) {

    /** CORS */
    // Or use npm install cors and import it
    console.log('Middleware: CORS')

    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );

    // Réponse à la requête preflight
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
        return;
    }

    next();
}