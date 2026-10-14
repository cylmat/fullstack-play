import { readFile } from "node:fs"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


// @doc https://docs.langchain.com/oss/javascript/integrations/splitters

export default async function chunkService(
): Promise<any> {
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 100, chunkOverlap: 0 })

    return 'y'
}
