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
        env: {
            ...process.env,
            // ANTHROPIC_BASE_URL: "https://gateway.example.com"
        },
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
        // "mcp__<server>__<tool>"" pattern
        allowedTools: ["mcp__claude-code-docs__*", "mcp__filesystem__*"], // like mcp__filesystem__read, mcp__filesystem__write...
        // les outils non explicitement autorisés sont refusés plutôt que de bloquer sur une demande de confirmation.
        permissionMode: "dontAsk",

        // Remove default
        // Retire complètement les outils Claude Code donnant un accès local.
        disallowedTools: [
            "Read",
            "Write",
            "Edit",
            "Bash",
            "Grep",
            "Glob",
            "NotebookEdit",

            // Optionnel : empêcher également toute suppression via MCP.
            "mcp__filesystem__delete_file",
            "mcp__filesystem__delete_directory",
            "mcp__filesystem__move_path",
        ],
    }

    console.log('anthropicClient apiKey provided in env var ?', !!process.env['ANTHROPIC_API_KEY'])
    console.log('anthropicAgent | prompting... ', prompt);

    const promptSended = 'Please answer with 50 characters max.' + `${prompt}`;

    const agentResponse: Query = agentQuery({
        prompt: promptSended,
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

/*
I haven't written anything yet.
Two separate things control whether I can, and only one of them is confirmed. **1.
Claude Code permissions (this is what's stopping me now).**
Your settings allow my file tools and simple `ls` commands without asking,
but they stop any Bash command that writes (`touch`, `rm`)
or that chains several commands together until you approve it.

To make that smoother, you can:
- **Approve each time:** just say yes when the prompt appears.
- **Accept edits for this session:** press **Shift+Tab** to switch to "accept edits" mode.
I can then edit and create files in `/var/www/application` without asking.
- **Make it permanent:**
I can add allow rules (for example `Edit`, `Write`, or specific Bash commands) to `.claude/settings.json` in the project.
Just ask and I'll set it up.
**2. Linux file permissions.** The folder is `drwxr-xr-x node node`,
which means only the `node` user can write to it.
I couldn't check which user I'm running as, because even `id` was stopped for approval.
- If I'm running as `node`, the filesystem is fine and only point 1 applies.
- If I'm running as a different user, writes will fail even after you approve them.
The fix would be to run Claude Code as `node`,
or to run something like `sudo chown -R $USER /var/www/application`
(or add your user to the `node` group and allow the group to write).
If you'd like, approve a quick `id` plus a test file write and I'll tell you for sure whether writing works.
*/