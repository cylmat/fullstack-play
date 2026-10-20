import { MongoClient, type Db } from "mongodb";

let client: MongoClient | null = null;

export default class MongoService {
    private static client: MongoClient | null = null;

    public static async getDb(): Promise<Db> {
        if (!process.env.MONGO_DSN) {
            throw new Error("MONGO_DSN est requis");
        }
        if (!this.client) {
            this.client = new MongoClient(process.env.MONGO_DSN);
            await this.client.connect();
        }

        return this.client.db(process.env.MONGO_DB_NAME);
    }

    public static async closeMongo(): Promise<void> {
        await this.client?.close();
        this.client = null;
    }
}
