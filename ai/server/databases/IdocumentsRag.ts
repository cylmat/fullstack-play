
import { EmbeddedFile } from "#app/types/embeddedFile.ts";
import { DocumentsRag } from "./documentsRag";

export interface IDocumentsRag {
    saveEmbeddedFile(file: Omit<EmbeddedFile, "updatedAt">): Promise<void> 
}
