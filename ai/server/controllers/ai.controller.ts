import { type Request, type Response } from 'express';
import anthropicService from '../services/anth.service.ts';

export const aiController = {
    postChat: async (req: Request, res: Response) => {
        const { message } = req.body as { message: string };
        if (typeof message !== 'string') {
            return res.status(400).json({
                error: 'Le champ "message" doit être une chaîne de caractères.'
            });
        }

        try {
            const datas: string[] = await anthropicService(message);
            res.status(200)
                .header('Content-Type', 'application/json')
                .json({ data: datas });
        } catch (error) {
            res.status(500)
                .header('Content-Type', 'application/json')
                .json({ error: (error as Error).message });
        }
    },

    getMCP: async (req: Request, res: Response) => {
        res.status(200).send('Hello from AI "MCP" controller !');
    }
};
