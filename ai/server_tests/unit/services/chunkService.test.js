import chunkService from '#app/services/rag/chunkService.ts';

describe('chunkService', () => {
    it('should be defined', async () => {
        expect(chunkService).toBeDefined();
    });

    it('should return an array of chunks', async () => {
        let content = "Test. Using"
        const result = await chunkService(content);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0)
    });
});
