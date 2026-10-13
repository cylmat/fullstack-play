// @doc https://www.mongodb.com/docs/manual/reference/method/
// @doc https://www.mongodb.com/docs/languages/javascript/




// @doc https://www.mongodb.com/docs/manual/reference/method/db.getSiblingDB/
// getSiblingDB: Used to return another database without modifying the db variable in the shell environment
db = db.getSiblingDB('AIdatabase');

// Roles @doc https://www.mongodb.com/docs/v7.0/reference/built-in-roles
// Use with: mongosh -u myuser -p pass --authenticationDatabase AIdatabase
db.createUser({
    user: 'myuser',
    pwd: 'pass',
    roles: [{ role: 'readWrite', db: 'AIdatabase' }]
});

db.createCollection('documentsRag', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "text", // textual content of the chunk (ex: " le texte lisible du morceau")
                "embedding", // vector representation of the chunk (ex: [0.123, 0.456, ...])
                "source", // source file name or identifier (ex: "guide.pdf")
                "chunkIndex" // index/number of the chunk in the source file (ex: 0, 1, 2, ...)
            ],
            properties: {
                text:       { bsonType: "string" },
                embedding:  { bsonType: "array" },
                source:     { bsonType: "string" },
                chunkIndex: { bsonType: "int" },
                fileType:   { bsonType: "string" },
                page:       { bsonType: ["int", "null"] }
            }
        }
    }
})

// INDEX //
// Sample 1: asc, 2: desc
// db.mydoc.createIndex({ source: 1 }) // composé db.chunks.createIndex({ source: 1, chunkIndex: 1 })
// for geojson: db.documents.createIndex({ embedding: "2dsphere" })




// ************************************************************************

/* ***
 * VECTORIAL SEARCH *
 *
// MongoDB Search trouve des correspondances textuelles pertinentes ;
// MongoDB Vector Search trouve des documents dont les embeddings sont proches de celui de la requête

// Pour une collection MongoDB.
// Le plus simple est d’y stocker un document par morceau de texte (chunk), avec le texte, la source et son embedding.
 * ***/

// @doc https://www.mongodb.com/docs/manual/reference/command/createsearchindexes/
// quick start: https://www.mongodb.com/docs/vector-search/tutorials/quick-start/
db.documentsRag.createSearchIndex(
    "rag_search_index", // name of the index
    "vectorSearch", {
        "fields": [
            {
                "type": "vector", // vector: for vector search, autoEmbed: for automatic embedding of text fields
                "path": "embedding", // document's -field- to index
                "numDimensions": 1536, // 256 | 512 | 1024 | 2048, (ex: with OpenAI text-embedding-3-small, default to 1536)
                "similarity": "euclidean", // similarity based on the angle between vectors, see also "cosine" or "dotProduct"
                "model": "voyage-4" // Balanced performance for general text search (also voyage-lite, voyage-large...)
            }
        ]
    }
)

// *****************************************************************

// Use LANGCHAIN
// @doc https://docs.langchain.com/oss/javascript/integrations/vectorstores/mongodb_atlas

// MANUAL EMBEDDING:       npm install langchain @langchain/mongodb @langchain/core @langchain/anthropic
// AUTO MONGODB EMBEDDING: npm install langchain @langchain/mongodb @langchain/core




// *****************************************************************

// Sample doc //
/*
{
  text: "Texte extrait et découpé du fichier...",
  embedding: [* vecteur numérique généré par ton modèle *],
  source: "guide.pdf",
  fileType: "pdf",
  chunkIndex: 0,
  page: 1
}

// sample search index for a movie
"type": "autoEmbed",
"path": "fullplot",
"modality": "text",
"model": "voyage-4"
*/

// CLAUDE EMBEDDING
```
/* exemple
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage } from "@langchain/core/messages";

// Initialize the Claude model node
const model = new ChatAnthropic({
  model: "claude-3-7-sonnet-latest", // or your preferred Claude model
  temperature: 0.7,
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Invoke the model
const response = await model.invoke([
  new HumanMessage("Hello Claude, describe an agent node in one sentence."),
]);

console.log(response.content);
*/
```


// * SAMPLE * //
// db.users.createIndex({ email: 1 }, { unique: true });
// db.conversations.createIndex({ userId: 1, createdAt: -1 });
// db.messages.createIndex({ conversationId: 1, createdAt: 1 });
