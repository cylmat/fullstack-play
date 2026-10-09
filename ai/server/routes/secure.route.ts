import { Router } from 'express';
import { secureController } from '../controllers/secure.controller.ts';

const secureRoute: Router = Router()

export default secureRoute
    .get('/token', secureController.getToken)
    .get('/api/current-user', secureController.getCurrentUser)
    .get('/api/me', secureController.getCurrentUser) // Alias for /api/current-user
    .post('/api/test-token', secureController.testToken)

// var privateKey = fs.readFileSync('private.key');
// var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });
