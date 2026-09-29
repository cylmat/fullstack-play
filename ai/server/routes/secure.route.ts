import { Router, type Request, type Response } from 'express';
import authService from '../services/auth.service.ts';

const secureRoute: Router = Router()

export default secureRoute
    .get('/token', (req: Request, res: Response) => {
        let signature = authService.getToken()
        console.log(signature)
        return res.json({ jwt: signature });
    })
    .get('/verify', (req: Request, res: Response) => {
        let token = req.body.token as string;
        let verified = authService.verifyToken(token);
        if (!verified) {
            return res.status(401).json({ error: 'Invalid token provided' });
        }
        return res.json({ verified });
    })

// var privateKey = fs.readFileSync('private.key');
// var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });
