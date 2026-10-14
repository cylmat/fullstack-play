import anthropicAgent from '#app/clients/anth.agent.ts';
import anthropicClient from '#app/clients/anth.client.ts';

export const ANTHROPIC_TYPE_CLIENT = 'client';
export const ANTHROPIC_TYPE_AGENT = 'agent';
export const ANTHROPIC_TYPES: AnthropicType[] = [ANTHROPIC_TYPE_CLIENT, ANTHROPIC_TYPE_AGENT]
export type AnthropicType = typeof ANTHROPIC_TYPE_CLIENT | typeof ANTHROPIC_TYPE_AGENT;
export type AnthropicServiceResult = { type: AnthropicType; messages: string[] }

export default async function anthropicService(
    prompt: string,
    useType?: AnthropicType
): Promise<AnthropicServiceResult> {
    useType = useType ?? ANTHROPIC_TYPE_AGENT;

    if (useType === ANTHROPIC_TYPE_CLIENT) {
        return callClient(prompt);
    }

    if (useType === ANTHROPIC_TYPE_AGENT) {
        return callAgent(prompt);
    }

    return { type: ANTHROPIC_TYPE_AGENT, messages: [] };
}

// Private

async function callClient(prompt: string): Promise<AnthropicServiceResult> {
    console.info('anthropicService | client calling with prompt: ', prompt);
    const clientContents = await anthropicClient(prompt);
    console.info('anthropicService | client response ok');

    let texts: string[] = [];
    for (const block of clientContents) {
        if (block.type === 'text') {
            texts.push(block.text);
        }
    }
    return { type: ANTHROPIC_TYPE_CLIENT, messages: texts };
}

async function callAgent(prompt: string): Promise<AnthropicServiceResult> {
    console.info('anthropicService | agent calling with prompt: ', prompt);
    const agentContents = await anthropicAgent(prompt);
    console.info('anthropicService | agent response ok');

    let texts: string[] = [];
    for (const block of agentContents.result?.messages ?? []) {
        texts.push(block);
    }

    return { type: ANTHROPIC_TYPE_AGENT, messages: texts };
}