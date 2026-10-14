import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import type { Document } from "@langchain/core/documents";

// @doc https://docs.langchain.com/oss/javascript/integrations/splitters

export default async function chunkService(content: string): Promise<Document[]> {
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 100, chunkOverlap: 0 })

    if (!content) {
        throw new Error("Content is required");
    }
    const chunks = await splitter.createDocuments([content]);

    console.info(`Nombre de chunks : ${chunks.length}`);

    return chunks
}
