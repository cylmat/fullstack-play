import {
    type SDKSystemMessage,
    type SDKAssistantMessage,
    type Query,
    type SDKResultMessage,
    type SDKResultSuccess,
    type Options
} from "@anthropic-ai/claude-agent-sdk";
import { query as agentQuery } from './anth.agent.wrapper.ts'

/**
 * @doc https://code.claude.com/docs/en/agent-sdk/overview
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

    //
    // INFO: Can get options too from a .mcp.json file at project root
    //
    let mcpOptions: Options = {
        mcpServers: {
            filesystem: {
                type: "http", // or streamable-http
                url: "http://fs-ai-mcpfilesystem:8123/mcp",
            }

            // @doc Claude DOC MCP server
            // "claude-code-docs": {
            //     type: "http",
            //     url: "https://code.claude.com/docs/mcp"
            // }

            // @doc samples:
            // filesystem: {
            //     command: "npx",
            //     args: ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/projects"],
                // headers: {
                //     Authorization: `Bearer ${process.env.API_TOKEN ?? null}`
                // },
                // env: {
                //     API_KEY: process.env.API_KEY ?? null
                // }
            // }
            // filesystem: {
            //     command: "docker",
            //     args: ["run", "-i", "--rm", "--mount", "type=bind,src=/Users/me/projects,dst=/projects", "mcp/filesystem", "/projects"]
            // }
        },
        allowedTools: ["mcp__claude-code-docs__*", "mcp__filesystem__*"] // "mcp__<server>__<tool>"" pattern
    }

    console.log('anthropicClient apiKey provided in env var ?', !!process.env['ANTHROPIC_API_KEY'])
    console.log('anthropicAgent | prompting... ', prompt);
    const agentResponse: Query = agentQuery({
        prompt: prompt,
        options: mcpOptions
    });

    let queryResponse: QueryResponse = {} as QueryResponse;

    let receivedAnyData = false;
    for await (const data of agentResponse) {
        receivedAnyData = true;
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

    if (!receivedAnyData) {
        console.error('anthropicAgent | agentResponse is empty');
    }

    console.log('anthropicAgent | responding.. ');

    return queryResponse;
}

/*

"I don't have any MCP server tools in this session.
MCP tools normally show up with an `mcp__<server>__<tool>` prefix,
and none of my tools, loaded or deferred, have that prefix.

These are the tools I do have, and they're all built into Claude Code:
**Files and shell:** Read, Write, Edit, Bash, NotebookEdit
**Web:** WebFetch, WebSearch
**Agents and orchestration:** Agent, SendMessage, ListAgents, Workflow, TaskStop
**Scheduling:** CronCreate, CronDelete, CronList, ScheduleWakeup, Monitor
**Other:** Skill, ToolSearch, ReportFindings, EnterWorktree, ExitWorktree, PushNotification, DesignSync

If you expected an MCP server to be here, you can check:
**`/mcp`** in Claude Code shows each configured server and whether it connected.
**`claude mcp list`** in a terminal lists configured servers.
**Config files:** `.mcp.json` in the project root, or `~/.claude.json` for user and local servers.
A server that's configured but not showing up may have failed to start or may need you to approve it.
`/mcp` will usually show why."

*/