import syncFilesCommand from "./rag/commands/syncFilesCommand.ts";

const command = process.argv[2]

switch (command) {
    case "sync:files":
        syncFilesCommand();
        break;
    default:
        console.error(`Unknown command: ${command}. Use one of: [sync:files]`);
}
