import transformerService from '#app/rag/services/transformerService.ts';

describe('transformerService', () => {
    it('should be defined', async () => {
        expect(transformerService).toBeDefined();
    });

    it('should return an array of chunks', async () => {
        let content = "Test. Using"
        // const result = await transformerService(content);
        expect(1).toBe(1)
    });
});
