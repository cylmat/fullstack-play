import { MongoClient, type Db } from "mongodb";

let client: MongoClient | null = null;

export default class MongoService {
    private static client: MongoClient | null = null;

    public static async getDb(): Promise<any> {
        if (!process.env.MONGO_DSN) {
            throw new Error("MONGO_DSN est requis");
        }

        if (!this.client) {
            console.info("Connecting to MongoDB...");
            this.client = new MongoClient(process.env.MONGO_DSN);
            await this.client.connect();
        }

        let db = this.client.db(process.env.MONGO_DB_NAME)
        let col = db.collection<any>('documentsRag')
//         db.documentsRag.insertOne({
//   text: "hello",
//   source: "test.txt",
//   chunkIndex: 0,
//   embedding: Array.from({ length: 1536 }, () => Math.random())
// })
        // let inserted = await col.insertOne(
        //     {
        //         text: 'r',
        //         source: 't',
        //         chunkIndex: 'i',
        //         embedding: [3]
        //     },
        // );
        console.log(col)

        // return this.client.db(process.env.MONGO_DB_NAME);
    }

    // public static async closeMongo(): Promise<void> {
    //     await this.client?.close();
    //     this.client = null;
    // }
}
