import { type SftpFile } from '#app/types/sftp.ts';
import { type FileEntryWithStats, type SFTPWrapper, Client } from 'ssh2'

const getSftpFiles = async (directory: string): Promise<SftpFile[]> => {

    const conn = new Client();

    return new Promise<SftpFile[]>((resolve, reject) => {
        conn
            .connect({
                host: "fs-ai-sftp",
                port: 22,
                username: "ftpuser",
                password: "change-moi",
            })
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
export default getSftpFiles;


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