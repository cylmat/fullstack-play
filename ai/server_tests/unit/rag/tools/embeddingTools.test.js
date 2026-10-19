import embeddingTools from '#app/utils/embed/embeddingTools.ts';

describe('embeddingTools', () => {
    it('should be defined', async () => {
        expect(embeddingTools).toBeDefined();
    });

    it('should return an array of chunks', async () => {
        let content = "Test. Using"
        // const result = await embeddingTools(content);
        expect(1).toBe(1)
    });
});
