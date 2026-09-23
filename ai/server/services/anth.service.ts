import anthropicAgent from '../clients/anth.agent.ts';
import anthropicClient from '../clients/anth.client.ts';

export const ANTHROPIC_TYPES: AnthropicType[] = ['agent', 'client'];
export type AnthropicType = 'agent' | 'client';
export type AnthropicServiceResult = { type: AnthropicType; messages: string[] };

export default async function anthropicService(
    prompt: string,
    useType?: AnthropicType
): Promise<AnthropicServiceResult> {
    useType = useType ?? 'agent';

    if (useType === 'client') {
        const clientContents = await anthropicClient(prompt);
        let texts: string[] = [];
        for (const block of clientContents) {
            if (block.type === 'text') {
                texts.push(block.text);
            }
        }
        return Promise.resolve({ type: 'client', messages: texts });
    }

    if (useType === 'agent') {
        const agentContents = await anthropicAgent(prompt);

        let texts: string[] = [];
        for (const block of agentContents.result?.messages ?? []) {
            texts.push(block);
        }

        return Promise.resolve({ type: 'agent', messages: texts });
    }

    return Promise.resolve({ type: 'agent', messages: [] });
}
