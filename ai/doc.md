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
        "mcp/filesystem",
        "/data"
      ]
    }
  }
}
```

Alternatively, use multiple bind mounts:

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
        "--mount",
        "type=bind,src=/Users/you/code,dst=/projects/code",
        "--mount",
        "type=bind,src=/Users/you/notes,dst=/projects/notes",
        "mcp/filesystem:latest",
        "/projects"
      ]
    }
  }
}
```
