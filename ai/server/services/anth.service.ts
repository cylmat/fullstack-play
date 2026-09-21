import Anthropic from '@anthropic-ai/sdk';


export default async function anthropicService() {

    console.log(process.env);

    // const client = new Anthropic({
    //     apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
    // });

    // const message = await client.messages.create({
    //     max_tokens: 1024,
    //     messages: [{ role: 'user', content: 'Hello, Claude' }],
    //     model: 'claude-opus-4-6',
    // });

    return Promise.resolve('ok')

    // console.log(message.content);
}
