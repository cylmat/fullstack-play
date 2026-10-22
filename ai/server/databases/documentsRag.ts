import type { Collection } from "mongodb";
import type { IDocumentsRag } from "#app/databases/IdocumentsRag.ts";
import type { EmbeddedFile } from "#app/types/embeddedFile.ts";
import MongoService from "#app/services/mongo.ts";

export default class DocumentsRag implements IDocumentsRag {
    
    private static readonly COLLECTION = "documentsRag";

    public static getInstance(): DocumentsRag {
        return new DocumentsRag();
    }

    public async saveEmbeddedFile(file: Omit<EmbeddedFile, "updatedAt">): Promise<void> {
        const collection = await this.getCollection();
        // await collection.insertOne(
        //     {
        //         text: 'r',
        //         source: 't',
        //         chunkIndex: 'i',
        //         embedding: [3]
        //     },
        // );
    }

    public async getCollection() {//Promise<Collection<EmbeddedFile>> {
        const db = await MongoService.getDb();
return 
        // return db.collection<EmbeddedFile>(DocumentsRag.COLLECTION)
    }

    private async testData() {
        const db = await MongoService.getDb()
        db.documentsRag.aggregate([ // aggregate: perform a vector search on the documentsRag collection
            {
                $vectorSearch: {
                    index: "rag_search_index",
                    path: "embedding",
                    queryVector: Array.from({ length: 1536 }, () => Math.random()),
                    numCandidates: 10,
                    limit: 3
                }
            },
            {
                $project: {
                    text: 1,
                    source: 1,
                    score: {
                        $meta: "vectorSearchScore"
                    }
                }
            }
        ])
    }
}
