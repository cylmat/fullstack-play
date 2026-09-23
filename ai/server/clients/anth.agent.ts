import { Query } from "@anthropic-ai/claude-agent-sdk";
import { query } from './anth.agent.wrapper'

/**
 * @doc https://code.claude.com/docs/en/agent-sdk/typescript
 */

export default async function anthropicAgent(): Promise<any> {

    const response: Query = query({
        'prompt': 'prompt'
    });

    return 't'

    let result = '';

    for await (const message of response) {
        if (message.type === 'assistant') {
            for (const block of message.message.content) {
                if (block.type === 'text') {
                    result += block.text;
                }
            }
        }

        if (message.type === 'result') {
            if (message.subtype === 'success') {
                result = message.result;
            } else {
                throw new Error(`Anthropic agent failed: ${message.subtype}`);
            }
        }
    }

    return result;
}
