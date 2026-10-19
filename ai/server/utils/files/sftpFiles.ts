import { type SftpFile } from '#app/types/sftp.ts';
import { type FileEntryWithStats, type SFTPWrapper, Client } from 'ssh2'

const getConfig = () => {
    let up = process.env.SFTP_DSN?.split('@')
    let username = up?.[0].split(':')[0];
    let password = up?.[0].split(':')[1];
    let host = up?.[1].split(':')[0];
    let port = parseInt(up?.[1].split(':')[1] || '22', 10);

    return {
        host,
        port,
        username,
        password
    }
}

export const getSftpFiles = async (directory: string): Promise<SftpFile[]> => {

    const conn = new Client();

    return new Promise<SftpFile[]>((resolve, reject) => {

        conn
            .connect(getConfig())
            .on("ready", () => {
                conn.sftp((err, sftp: SFTPWrapper) => {
                    if (err) throw err;

                    let listElements: SftpFile[] = []
                    sftp.readdir(directory, async (err, files: FileEntryWithStats[]) => {
                        if (err) throw err;

                        for (const element of files) {
                            if (element.attrs.isFile()) {
                                listElements.push({
                                    filename: element.filename,
                                    longname: element.longname,
                                    size: element.attrs.size,
                                    mtime: element.attrs.mtime,
                                    basedir: directory,
                                    path: `${directory}/${element.filename}`
                                });
                            }

                            if (element.attrs.isDirectory()) {
                                let children = await getSftpFiles(`${directory}/${element.filename}`);
                                listElements.push(...children);
                            }
                        }

                        conn.end();
                        resolve(listElements);
                    });
                });
            })
        ;
    })
}

export const getFileContent = async (path: string): Promise<string> => {
    const conn = new Client();
    let config = getConfig()

    return new Promise<string>((resolve, reject) => {
        const fail = (err: Error) => {
            conn.end();
            reject(err);
        };

        conn
            .on("error", fail)
            .connect(getConfig())
            .on("ready", () => {
                conn.sftp((err, sftp: SFTPWrapper) => {
                    if (err) {
                        fail(err);
                        return;
                    }

                    const stream = sftp.createReadStream(path);
                    const chunks: Buffer[] = [];

                    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
                    stream.on("error", fail);
                    stream.on("end", () => {
                        conn.end();
                        resolve(Buffer.concat(chunks).toString("utf8"));
                    });
                });
            });
    });
};


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