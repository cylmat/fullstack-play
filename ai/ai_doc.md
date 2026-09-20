## JSON RCP Request

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "list_directory",
    "arguments": { "path": "/data" }
  }
}
## Json RCP response

{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [{ "type": "text", "text": "..." }]
  }
}

or 

{"jsonrpc": "2.0", "id": 1, "error": {"code": ..., "message": "..."}}

## Anthropic SDK

```
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
});

const message = await client.messages.create({
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, Claude' }],
  model: 'claude-opus-4-6',
});

console.log(message.content);
```

### Configure Claude Desktop

1. Select **User** → **Settings** → **Developer** → **Change configuration**.
2. This opens:

   `C:\Users\<user>\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json`
3. Fully close Claude Desktop, including its system tray icon.

### Run the Filesystem MCP Server

```bash
docker run -i --rm \
  --mount type=bind,src=/path/on/host,dst=/projects/workspace \
  mcp/filesystem \
  /projects
```

### Claude Desktop Configuration

For Claude Desktop, which runs Docker itself:

Use multiple bind mounts (--mount is like -v but safer, but can't use "~"):
Type: bind, volume, tmpsf
ex: --mount type=bind,src=/servers/fullstack-play/ai/data,dst=/data

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "wsl",
      "args": [
        "docker",
        "run",
        "-i",
        "--rm",
        "-v",
        "~/servers/fullstack-play/ai/data:/data",
        "mcp/filesystem:latest",
        "/data"
      ]
    }
  }
}
```
