// import { spawn } from 'node:child_process';
// import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
// import { tmpdir } from 'node:os';
// import { join } from 'node:path';

// function quotePath(path: string): string {
//     if (!path || /[\r\n\0]/.test(path)) {
//         throw new Error('SFTP paths must be non-empty and cannot contain line breaks');
//     }

//     return `"${path.replace(/(["\\])/g, '\\$1')}"`;
// }

// function runBatch(command: string): Promise<string> {
//     const dsn = process.env.SFTP_DSN;
//     if (!dsn) {
//         throw new Error('SFTP_DSN est requis');
//     }

//     return new Promise((resolve, reject) => {
//         const client = spawn(
//             'sftp',
//             [
//                 '-b',
//                 '-',
//                 '-i',
//                 '/home/node/.ssh/sftp-ftpuser_ed25519',
//                 '-P',
//                 '22',
//                 dsn
//             ],
//             { timeout: 120_000 }
//         );
//         let stdout = '';
//         let stderr = '';

//         client.stdout.setEncoding('utf8');
//         client.stderr.setEncoding('utf8');

//         client.stdout.on('data', (data: string) => {
//             stdout += data;
//         });
//         client.stderr.on('data', (data: string) => {
//             stderr += data;
//         });
//         client.once('error', reject);
//         client.stdin.once('error', reject);
//         client.once('close', (code, signal) => {
//             if (code === 0) {
//                 resolve(stdout);
//                 return;
//             }

//             reject(
//                 new Error(
//                     `SFTP command failed${signal ? ` (signal ${signal})` : ` (exit code ${code})`}${stderr ? `: ${stderr.trim()}` : ''}`
//                 )
//             );
//         });

//         client.stdin.end(`${command}\n`);
//     });
// }

// async function withTempDirectory<T>(action: (directory: string) => Promise<T>): Promise<T> {
//     const directory = await mkdtemp(join(tmpdir(), 'sftp-tool-'));
//     try {
//         return await action(directory);
//     } finally {
//         await rm(directory, { recursive: true, force: true });
//     }
// }

// export const sftpTool = {
//     async list(remotePath: string): Promise<string[]> {
//         const output = await runBatch(`ls -1 ${quotePath(remotePath)}`);
//         return output.split(/\r?\n/).filter(Boolean);
//     },

//     async get(remotePath: string, localPath: string): Promise<void> {
//         await runBatch(`get ${quotePath(remotePath)} ${quotePath(localPath)}`);
//     },

//     async read(remotePath: string): Promise<string> {
//         return withTempDirectory(async (directory) => {
//             const localPath = join(directory, 'download');
//             await runBatch(`get ${quotePath(remotePath)} ${quotePath(localPath)}`);
//             return readFile(localPath, 'utf8');
//         });
//     },

//     async put(localPath: string, remotePath: string): Promise<void> {
//         await runBatch(`put ${quotePath(localPath)} ${quotePath(remotePath)}`);
//     },

//     async write(remotePath: string, content: string | Uint8Array): Promise<void> {
//         await withTempDirectory(async (directory) => {
//             const localPath = join(directory, 'upload');
//             await writeFile(localPath, content);
//             await runBatch(`put ${quotePath(localPath)} ${quotePath(remotePath)}`);
//         });
//     },

//     async remove(remotePath: string): Promise<void> {
//         await runBatch(`rm ${quotePath(remotePath)}`);
//     },

//     async mkdir(remotePath: string): Promise<void> {
//         await runBatch(`mkdir ${quotePath(remotePath)}`);
//     },

//     async rename(oldRemotePath: string, newRemotePath: string): Promise<void> {
//         await runBatch(`rename ${quotePath(oldRemotePath)} ${quotePath(newRemotePath)}`);
//     }
// };

// export default sftpTool;
