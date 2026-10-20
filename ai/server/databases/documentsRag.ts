import type { Collection } from "mongodb";
import type { IDocumentsRag } from "#app/databases/IdocumentsRag.ts";
import MongoService from "#app/services/mongo.ts";
import { EmbeddedFile } from "#app/types/embeddedFile.ts";

export default class DocumentsRag implements IDocumentsRag {
    
    private static readonly COLLECTION = "documentsRag";

    public static getInstance(): DocumentsRag {
        return new DocumentsRag();
    }

    public async saveEmbeddedFile(file: Omit<EmbeddedFile, "updatedAt">): Promise<void> {
        const collection = await this.getCollection();
        await collection.updateOne(
            {
                text: 'r',
                source: 't',
                chunkIndex: 'i',
                embedding: [3]
            },
        );
    }

    public async getCollection(): Promise<Collection<EmbeddedFile>> {
        const db = await MongoService.getDb();
        return db.collection<EmbeddedFile>(DocumentsRag.COLLECTION);
    }
}
