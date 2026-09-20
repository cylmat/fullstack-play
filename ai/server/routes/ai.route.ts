import { type Request, type Response } from 'express';
import { Router } from 'express';
import { aiController } from '../controllers/ai.controller.ts';

const aiRoute: Router = Router()

export default aiRoute

  .post('/chat', (req: Request, res: Response) => {
    aiController.postChat(req, res)
      
  })
  .get('/mcp', (req: Request, res: Response) => {
    aiController.getMCP(req, res)
  })

