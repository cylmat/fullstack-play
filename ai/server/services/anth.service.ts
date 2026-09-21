
import anthropicClient from '../clients/anth.client.ts';


export default async function anthropicService(prompt: string): Promise<string[]> {

    const contents = await anthropicClient(prompt);

    let texts: string[] = []
    for (const block of contents) {
        if (block.type === 'text') {
            texts.push(block.text);
        }
    }

    return Promise.resolve(texts)
}
