import "dotenv/config";
import { execFile } from 'node:child_process';
import { promisify } from "node:util"; // @doc https://nodejs.org/api/util.html#utilpromisifyoriginal
import { spawn } from "node:child_process";
import { Client } from 'ssh2'
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


    let listFiles: string[] = await getSftpFiles();

    console.log(listFiles);

}

const getSftpFiles = async (): Promise<string[]> => {

    const ROOT_DIR = '/upload'
    const conn = new Client();

    return new Promise<string[]>((resolve, reject) => {
        conn
            .connect({
                host: "fs-ai-sftp",
                port: 22,
                username: "ftpuser",
                password: "change-moi",
            })
            .on("ready", () => {
                conn.sftp((err: any, sftp: any) => {
                    if (err) throw err;

                    let listFiles: string[] = []
                    sftp.readdir(ROOT_DIR, (err: any, files: any) => {
                        if (err) throw err;

                        for (const file of files) {
                            listFiles.push(file.filename);
                            // console.log(file.filename, file.attrs.size, file.attrs.mtime);
                        }

                        conn.end();
                        // return listFiles;
                        resolve(listFiles);
                    });

                });
            })
        ;
    })
}


    // sftp -vvv -i /home/node/.ssh/sftp-ftpuser_ed25519 -P 22 ftpuser@fs-ai-sftp
    // let sftp = spawn(
    //     "sftp",
    //     [
    //         "-b", "-", // lire les commandes SFTP depuis stdin
    //         "-i", "/home/node/.ssh/sftp-ftpuser_ed25519",
    //         "-P", "22",
    //         process.env.SFTP_DSN,
    //     ],
    //     { timeout: 120_000 },
    // );

    // sftp.stdout.setEncoding("utf8");
    // sftp.stderr.setEncoding("utf8");

    // sftp.stdin.write(`ls ${ROOT_DIR}\n`); // careful "ls -al is shell command, not sftp one"
    // sftp.stdin.end();

    // sftp.stdout.on("data", (data) => {
    //     console.info(`stdout: ${data}`);
    // });

    // sftp.stderr.on("data", (data) => {
    //     console.error(`stderr: ${data}`);
    // });