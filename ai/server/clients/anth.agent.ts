import {
    type SDKSystemMessage,
    type SDKAssistantMessage,
    type Query,
    type SDKResultMessage,
    type SDKResultSuccess
} from "@anthropic-ai/claude-agent-sdk";
import { query as agentQuery } from './anth.agent.wrapper.ts'

/**
 * @doc https://code.claude.com/docs/en/agent-sdk/typescript
 */

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

export default async function anthropicAgent(prompt: string): Promise<any> {

    const agentResponse: Query = agentQuery({
        prompt: prompt
    });

    let queryResponse: QueryResponse = {} as QueryResponse;

    for await (const data of agentResponse) {
        if (data.type === 'system') {
            let systemData: SDKSystemMessage = data as SDKSystemMessage;
            queryResponse.system = {
                type: systemData.type,
                cwd: systemData.cwd ?? undefined,
                tools: systemData.tools ?? [],
                mcpServers: systemData.mcp_servers ?? [],
                model: systemData.model ?? '',
                slash_commands: systemData.slash_commands,
                skills: systemData.skills
            };
        }

        if (data.type === 'assistant') {
            let assistantData: SDKAssistantMessage = data as SDKAssistantMessage;
            queryResponse.assistant = {
                messageModel: assistantData.message.model ?? '',
                session_id: assistantData.session_id ?? ''
            };
        }

        if (data.type === 'result') {
            let resultData: SDKResultSuccess = data as SDKResultSuccess;
            let modelUsage = Object.keys(resultData.modelUsage)[0] ?? []
            let resultMessage = resultData.result
            queryResponse.result = {
                usage: modelUsage.length > 0 ? JSON.stringify(modelUsage) : '',
                isError: resultData.is_error ?? false,
                messages: [...(queryResponse.result?.messages ?? []), ...[resultMessage]]
            };
        }
    }

    return queryResponse;
}
