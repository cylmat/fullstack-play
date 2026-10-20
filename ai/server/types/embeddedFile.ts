
export type EmbeddedFile = {
    
    text: string, // textual content of the chunk (ex: " le texte lisible du morceau")
    embedding: number[], // vector representation of the chunk (ex: [0.123, 0.456, ...])
    source: string, // source file name or identifier (ex: "guide.pdf")
    chunkIndex: string
            
};
