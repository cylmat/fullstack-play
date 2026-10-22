import type { Collection } from "mongodb";
import type { IDocumentsRag } from "#app/databases/IdocumentsRag.ts";
import type { EmbeddedFile } from "#app/types/embeddedFile.ts";
import MongoService from "#app/services/mongo.ts";

export default class DocumentsRag implements IDocumentsRag {
    
    private static readonly COLLECTION = "documentsRag";

    public static getInstance(): DocumentsRag {
        return new DocumentsRag();
    }

    public async closeMongo(): Promise<void> {
        await MongoService.close();
    }

    public async saveEmbeddedFile(file: Omit<EmbeddedFile, "updatedAt">): Promise<void> {
        const collection = await this.getCollection();

        // await collection.insertOne({
        //     text: "hello",
        //     embedding: Array.from({ length: 1536 }, () => Math.random()),
        //     source: "test.txt",
        //     chunkIndex: 0,
        // })

    }

    public async getCollection(): Promise<Collection<EmbeddedFile>> {
        const db = await MongoService.getDb();

        return db.collection<EmbeddedFile>(DocumentsRag.COLLECTION)
    }

    public async testData() {
        const db = await MongoService.getDb()

        const collection = await this.getCollection()

          // @info Vector search ONLY exists on the aggregation side !
        return await collection.aggregate([{
            $vectorSearch: {
                index: "rag_search_index",
                path: "embedding",
                queryVector: Array.from({ length: 1536 }, () => Math.random()),
                numCandidates: 10,
                limit: 3
            }
        }]).toArray() // @info aggregate: perform a vector search on the documentsRag collection

        
        // let db = this.client.db(process.env.MONGO_DB_NAME)
        // let col = db.collection<any>('documentsRag')
        // let r = Array.from({ length: 3 },  () => Math.random())
        // console.log(r,44)

       
      
            // {
            //     $vectorSearch: {
            //         index: "rag_search_index",
            //         path: "embedding",
            //         queryVector: Array.from({ length: 1536 }, () => Math.random()),
            //         numCandidates: 10,
            //         limit: 3
            //     }
            // },
            // {
            //     $project: {
            //         text: 1,
            //         source: 1,
            //         score: {
            //             $meta: "vectorSearchScore"
            //         }
            //     }
            // }
        // ])
        // col.aggregate([ // aggregate: perform a vector search on the documentsRag collection
        //     {
        //         $vectorSearch: {
        //             index: "rag_search_index",
        //             path: "embedding",
        //             queryVector: Array.from({ length: 1536 }, () => Math.random()),
        //             numCandidates: 10,
        //             limit: 3
        //         }
        //     },
        //     {
        //         $project: {
        //             text: 1,
        //             source: 1,
        //             score: {
        //                 $meta: "vectorSearchScore"
        //             }
        //         }
        //     }
        // ])
        // db.documentsRag.aggregate([ // aggregate: perform a vector search on the documentsRag collection
        //     {
        //         $vectorSearch: {
        //             index: "rag_search_index",
        //             path: "embedding",
        //             queryVector: Array.from({ length: 1536 }, () => Math.random()),
        //             numCandidates: 10,
        //             limit: 3
        //         }
        //     },
        //     {
        //         $project: {
        //             text: 1,
        //             source: 1,
        //             score: {
        //                 $meta: "vectorSearchScore"
        //             }
        //         }
        //     }
        // ])
    }
}
