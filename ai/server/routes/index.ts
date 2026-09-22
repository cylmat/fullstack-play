import { Router } from 'express';
import aiRoute from './ai.route.ts';
import homeRoute from './home.route.ts';

const routes: Router = Router();

export default routes.use('', aiRoute).use('', homeRoute);
