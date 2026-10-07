import { Router } from 'express';
import aiRoute from './ai.route.ts';
import homeRoute from './home.route.ts';
import secureRoute from './secure.route.ts';

const routes: Router = Router();

export default routes
.use('', homeRoute)
.use('/api', aiRoute)

// no /api for token
.use('', secureRoute)
