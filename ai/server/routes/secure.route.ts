import { Router } from 'express';
import { getToken, testToken } from '../controllers/secureController.ts';

const secureRoute: Router = Router()

export default secureRoute
    .get('/token', getToken)
    .post('/api/test-token', testToken)

// var privateKey = fs.readFileSync('private.key');
// var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });
