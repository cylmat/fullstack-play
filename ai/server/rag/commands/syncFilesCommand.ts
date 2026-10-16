import { execFile } from 'node:child_process';
import { promisify } from "node:util"; //  @doc https://nodejs.org/api/util.html#utilpromisifyoriginal


export default function syncFilesCommand(): void {
    // get files from sftp
    const host = process.env.SFTP_HOST;
    const username = process.env.SFTP_USERNAME;
    const remoteDirectory = process.env.SFTP_REMOTE_DIRECTORY ?? "/upload";
    const localDirectory = process.env.SFTP_LOCAL_DIRECTORY ?? "./data";
    const port = process.env.SFTP_PORT ?? "22";

    if (!host || !username) {
        throw new Error("SFTP_HOST et SFTP_USERNAME sont requis");
    }

}
