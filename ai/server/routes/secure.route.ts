import { Router, type Request, type Response } from 'express';
import authService from '../services/auth.service.ts';

const secureRoute: Router = Router()

export default secureRoute
    .get('/token', (req: Request, res: Response) => {
        let signature = authService.getToken()
        console.log(signature)
        return res.json({ jwt: signature });
    })
    .post('/api/test-token', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('TEST', 'test-header');
        res.statusCode = 201;

        return res.json({ message: 'Test token endpoint [OK]' });
    })

// var privateKey = fs.readFileSync('private.key');
// var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });
