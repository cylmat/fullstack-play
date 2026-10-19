import "dotenv/config";
import { type SftpFile } from "#app/types/sftp.ts";
import getSftpFiles from "#app/utils/files/getSftpFiles.ts";
// import { execFile } from 'node:child_process';
// import { promisify } from "node:util"; // @doc https://nodejs.org/api/util.html#utilpromisifyoriginal
// import { spawn } from "node:child_process";
// const { Client } = require("ssh2"); @TODO

// Create ssh key
// mkdir -p /home/node/ssh
// ssh-keygen -t ed25519 -f /home/node/ssh/ftpuser_ed25519 -C "ftpuser-sftp"
// ls /home/node/ssh

export default async function syncFilesCommand(): Promise<void> {

    // const execFileAsync = promisify(execFile);

    // get files from sftp
    if (!process.env.SFTP_DSN) {
        throw new Error("SFTP_DSN est requis");
    }


    let listElements: SftpFile[] = await getSftpFiles('/upload');

    console.log(listElements);

}
