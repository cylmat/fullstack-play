import { DataArray } from "@huggingface/transformers";

export type EmbeddedFile = {
    source: string, // source file name or identifier (ex: "guide.pdf")
    text: string, // textual content of the chunk (ex: " le texte lisible du morceau")
    embedding: DataArray, // vector representation of the chunk (ex: [0.123, 0.456, ...])
    chunkIndex: number
};
