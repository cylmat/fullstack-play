import { type Request, type Response } from 'express';
import anthropicService, { type AnthropicType, type AnthropicServiceResult, ANTHROPIC_TYPES } from '../services/anth.service.ts';
import { getParsedBodyErrors } from '../utils/parseBody.ts';

type ChatPromptType = {
    message: string;
    useType?: AnthropicType
}
const CHAT_PROMPT_KEYS = ['message', 'useType'] as string[];

export const aiController = {
    postChat: async (req: Request, res: Response) => {
        const { message, useType = 'agent' } = req.body as ChatPromptType;

        const parsedBodyErrors = getParsedBodyErrors(req.body, CHAT_PROMPT_KEYS);
        if (parsedBodyErrors.length > 0) {
            return res.status(400).json({
                error: `Champs non autorisés : [${parsedBodyErrors.join(', ')}] parmis [${CHAT_PROMPT_KEYS.join(', ')}]`
            });
        }

        if (!ANTHROPIC_TYPES.includes(useType)) {
            return res.status(400).json({
                error: `Le champ 'useType' doit être l'un de [${ANTHROPIC_TYPES.join(', ')}].`
            });
        }

        if (typeof message !== 'string') {
            return res.status(400).json({
                error: 'Le champ "message" doit être une chaîne de caractères.'
            });
        }

        try {
            const datas: AnthropicServiceResult = await anthropicService(message, useType);
            res.status(200)
                .header('Content-Type', 'application/json')
                .json(datas);
        } catch (error) {
            res.status(500)
                .header('Content-Type', 'application/json')
                .json({ error: (error as Error).message });
        }
    },

    getMCP: async (req: Request, res: Response) => {
        res.status(200).send('Hello from AI "MCP" controller !');
    }
}
