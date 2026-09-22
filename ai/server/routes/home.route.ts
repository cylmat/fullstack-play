import { Router, type Request, type Response } from 'express';

const homeRoute: Router = Router();

export default homeRoute.get('/', (req: Request, res: Response) => {
    res.header('Content-Type', 'application/json');
    res.send('{"message": "Hello World!"}');
});
