import "dotenv/config";
import { type SftpFile } from "#app/types/sftp.ts";
import { getSftpFiles, getFileContent } from "#app/utils/files/sftpFiles.ts";
import embeddingTools from "#app/utils/embed/embeddingTools.ts";
import documentsRag from "#app/databases/documentsRag.ts";
// import { execFile } from 'node:child_process';
// import { promisify } from "node:util"; // @doc https://nodejs.org/api/util.html#utilpromisifyoriginal
// import { spawn } from "node:child_process";
// const { Client } = require("ssh2"); @TODO

// Create ssh key
// mkdir -p /home/node/ssh
// ssh-keygen -t ed25519 -f /home/node/ssh/ftpuser_ed25519 -C "ftpuser-sftp"
// ls /home/node/ssh

export default async function syncFilesCommand(): Promise<void> {

    // get files from sftp
    if (!process.env.SFTP_DSN) {
        throw new Error("SFTP_DSN est requis");
    }

    let listElements: SftpFile[] = await getSftpFiles('/upload');

    for (const file of listElements) {
        const content = await getFileContent(file.path);
        const embed = await embeddingTools(content);

        documentsRag.getInstance().saveEmbeddedFile({
            // type: "file",
            // filename: file.filename,
            // size: file.size,
            // mtime: file.mtime,
            // content: String(content),
            // embedding: Array.from(embed as ArrayLike<number>),
             
                text: 'r',
                source: 't',
                chunkIndex: 'i',
                embedding: [3]
            
        });

        let r = await documentsRag.getInstance().getCollection();

        // await saveEmbeddedFile({
        //     path: file.path,
        //     filename: file.filename,
        //     size: file.size,
        //     mtime: file.mtime,
        //     content: String(content),
        //     embedding: Array.from(embed as ArrayLike<number>),
        // });
    }
}
