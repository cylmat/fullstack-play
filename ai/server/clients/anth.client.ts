import Anthropic from '@anthropic-ai/sdk';
import { type ContentBlock } from '@anthropic-ai/sdk/resources';

/**
 * @doc https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/typescript
 */

export default async function anthropicClient(
    prompt: string
): Promise<ContentBlock[]> {
    const client = new Anthropic({
        apiKey: process.env['ANTHROPIC_API_KEY'] // This is the default and can be omitted
    });

    const promptSended = 'Please answer with 50 characters max.' + `${prompt}`;

    // claude-opus-4-6 $$
    // claude-sonnet-4-5 bon compromis
    // claude-haiku-4-5 less expensive
    const response = await client.messages.create({
        max_tokens: 1024,
        messages: [{ role: 'user', content: promptSended }],
        model: 'claude-haiku-4-5'
    });

    // ContentBlock is like { type: string; text: string }
    const contents: ContentBlock[] = response.content;

    return Promise.resolve(contents);
}
