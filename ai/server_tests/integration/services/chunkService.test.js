import chunkService from '#app/services/chunkService.ts';

describe('chunkService', () => {
    it('should be defined', async () => {
        expect(chunkService).toBeDefined();
    });

    it('should return "y"', async () => {
        const result = await chunkService();
        expect(result).toBe('y');
    });
});
