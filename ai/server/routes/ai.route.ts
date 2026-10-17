import { Router } from 'express';
import { aiController } from '#app/controllers/ai.controller.ts';

const aiRoute: Router = Router();

export default aiRoute
    .post('/chat', aiController.postChat)
    .get('/mcp', aiController.getMCP)

;

export const aiAdminRoute: Router = Router()

    // Admin
    .post('/embed', aiController.embedText)
;
