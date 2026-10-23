import type { SftpFile } from "#app/types/sftp.ts";
import embeddingTools from "#app/utils/embed/embeddingTools.ts";
import documentsRag from "#app/databases/documentsRag.ts";
import { getFileContent, getSftpFiles } from "#app/utils/files/sftpFiles.ts";

export const embeddingFilesService = {
    async embedFiles(listElements: SftpFile[]): Promise<number> {

        const documentsRagInstance = documentsRag.getInstance();

        for (const file of listElements) {
            let source = file.path
            const text = await getFileContent(file.path);
            const embeddingRaw = await embeddingTools(text);
            const embedding = Array.from(embeddingRaw);

            await documentsRagInstance.saveEmbeddedFile({
                source,
                text,
                embedding,
                chunkIndex: 0,
            });
        }

        console.log('EmbeddingFilesService [OK]')
        await documentsRagInstance.closeMongo();

        return 0
    }
}
