
export type QueryResponse = {
    system: {
        type: string;
        cwd: string;
        tools: string[];
        mcpServers: any[];
        model: string;
        slash_commands: string[];
        skills: string[];
    },
    assistant: {
        messageModel: string;
        session_id: string;
    },
    result: {
        usage: string;
        isError: boolean;
        messages: string[];
    }
}
