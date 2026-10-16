import "dotenv/config";
import { execFile } from 'node:child_process';
import { promisify } from "node:util"; // @doc https://nodejs.org/api/util.html#utilpromisifyoriginal
import { spawn } from "node:child_process";

// Create ssh key
// mkdir -p /home/node/ssh
// ssh-keygen -t ed25519 -f /home/node/ssh/ftpuser_ed25519 -C "ftpuser-sftp"
// ls /home/node/ssh

export default async function syncFilesCommand(): Promise<void> {

    const execFileAsync = promisify(execFile);

    // get files from sftp
    if (!process.env.SFTP_DSN) {
        throw new Error("SFTP_DSN est requis");
    }

    // sftp -vvv -i /home/node/.ssh/sftp-ftpuser_ed25519 -P 22 ftpuser@fs-ai-sftp
    let sftp = spawn(
        "sftp",
        [
            "-b", "-", // lire les commandes SFTP depuis stdin
            "-i", "/home/node/.ssh/sftp-ftpuser_ed25519",
            "-P", "22",
            process.env.SFTP_DSN,
        ],
        { timeout: 120_000 },
    );

    sftp.stdin.write("ls -la /home/ftpuser/upload\n");
    sftp.stdin.end();

    sftp.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
    });

}
