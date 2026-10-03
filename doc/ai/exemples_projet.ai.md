Exemple
=======

Ref
---
- Le RAG (ou génération augmentée de récupération) est une technique d'intelligence artificielle qui associe un grand modèle de langage à une base de données externe pour fournir des réponses précises et actualisées

La recherche (Récupération) : Lorsque vous posez une question, le système analyse le sens de votre demande et fouille dans une base de documents.
La rédaction (Génération) : Le logiciel donne les extraits trouvés à l'intelligence artificielle pour qu'elle rédige une réponse claire et basée sur ces faits

- Un SaaS (pour Software as a Service, ou « logiciel en tant que service ») est un modèle de distribution de logiciels hébergés sur le cloud et accessibles à distance via un simple navigateur internet, le plus souvent sur abonnement (exemple les outils de messagerie)


Projets
-------

Le plus pertinent aujourd’hui :

- En entreprise, les usages les plus fréquents sont la déflection du support niveau 1 : FAQ, suivi de demande, réinitialisation de mot de passe, statut de commande, questions de politique interne.
- Les entreprises cherchent aussi beaucoup des assistants pour IT interne et RH, car ce sont des volumes répétitifs faciles à automatiser.
- Côté commercial, le chatbot de qualification de leads reste très demandé : il pose quelques questions, détecte l’intention, puis route vers l’équipe sales ou prend un rendez-vous

En entreprise, ordre de priorité :

    Chatbot support / base de connaissances
    Assistant interne pour employés
    Bot de qualification de leads
    Assistant IT helpdesk
    Assistant RH

Très pragmatique :  

    pour un SaaS ou une app B2B, un assistant de support + recherche documentaire ;
    pour une application interne, un assistant RH/IT ;
    pour un site orienté acquisition, un bot de qualification commerciale.1 2 10 12

3 idées IA les plus demandées en entreprise aujourd’hui pour une application web, avec une architecture simple pour démarrer rapidement.

1. Chatbot de support / base de connaissances
    C’est le cas d’usage le plus classique et le plus facile à vendre : répondre aux questions récurrentes à partir de la FAQ, des docs, des PDF ou du wiki interne. 

2. Assistant interne pour employés
    Très demandé pour les cas RH et IT : politiques internes, onboarding, demandes d’accès, mots de passe, procédures, tickets simples.

3. Bot de qualification commerciale / lead generation
    Il répond aux questions produit, qualifie l’intention du visiteur et peut proposer un rendez-vous ou transférer vers un humain.


ARCHITECTURE
------------

Architecture simple recommandée

    Frontend web
        Interface chat
        Historique des conversations
        Bouton “parler à un humain”

    Backend API
        Authentification
        Gestion des sessions
        Appels au modèle IA
        Journalisation et analytics

    Couche RAG
        Ingestion des documents
        Découpage en morceaux
        Génération d’embeddings
        Recherche des passages pertinents
        Injection du contexte dans le prompt

    Base de données
        Utilisateurs
        Conversations
        Logs
        Sources/documentation

    Vector store
        Pour retrouver rapidement les bons extraits de documents

    LLM
        Génère la réponse finale à partir du contexte récupéré

Flux simple

    L’utilisateur pose une question.
    Le backend transforme la question en requête de recherche.
    Le système récupère les passages les plus pertinents dans les documents.
    Le modèle génère une réponse basée sur ce contexte.
    L’interface affiche la réponse avec, si possible, les sources utilisées.9 13 15

MVP minimal que je te recommande

    Upload de PDF / docs
    Chat en français
    Réponses sourcées
    Escalade vers humain
    Logs des questions sans réponse
    Dashboard simple des sujets les plus demandés

Si tu veux aller plus vite

Tu peux partir sur cette stack simple :

    Frontend : Next.js ou React
    Backend : Node.js ou Php
    Vector store : PostgreSQL avec extension vectorielle, ou une base dédiée
    LLM : API externe au début
    RAG : pipeline simple “question → recherche → réponse”



Mermaid exemple
-------

```
flowchart LR
    U[Utilisateur<br/>Web / Mobile] --> F[Frontend<br/>SPA / Web app]

    F --> API[Backend API<br/>REST / GraphQL]

    API --> AUTH[Auth & Permissions<br/>JWT / OAuth2]
    API --> LOGS[Base SQL classique<br/>utilisateurs, sessions, logs]

    API --> ORCH[Orchestrateur IA<br/>RAG + outils métier]

    ORCH --> LLM[Service LLM<br/>génération de réponses]

    ORCH --> RAG[RAG Engine<br/>retrieval + ranking]

    RAG --> PGV[(PostgreSQL + pgvector<br/>table chunks + embeddings)]
    RAG --> META[(Base SQL Docs<br/>metadata, droits, tags)]

    INGEST[Pipeline d’ingestion<br/>OCR + chunking + embeddings] --> PGV
    INGEST --> META

    SRC[Sources docs<br/>PDF, wiki, FAQ, CRM] --> INGEST
```

Technique
---------

Exemple de base vectorielle, tu as deux approches courantes :

- PostgreSQL + pgvector : le plus simple si tu veux garder SQL + vecteurs dans la même base.1 5 11
- MySQL 9+ avec support natif VECTOR : possible aussi, mais l’écosystème est généralement moins mature que PostgreSQL pour les usages RAG/semantic search.13


ref:
- https://ai-sdk.dev/



-------------------------------------------------------------
        Exemple de code
-------------------------------------------------------------

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




---------------------------------------------
---------------------------------------------
---------------------------------------------

## NODE usage

1. Official Node filesystem MCP server (recommended)
The official reference filesystem MCP server is published on npm as @modelcontextprotocol/server-filesystem.  
You can run it in several ways:

Direct via npx (no install):
npx -y @modelcontextprotocol/server-filesystem /path/to/allowed/dir1 /path/to/allowed/dir2

Configured as an MCP server in a client (e.g. VS Code, Claude Desktop):
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/you/projects",
        "/Users/you/notes"
      ]
    }
  }
}


This is the canonical Node implementation, so it’s the best choice for learning MCP as an integrator/architect.
If you want Docker on top of this, you can create a simple Dockerfile that installs Node, adds this package, and runs the server with your desired root path.

2. Other Node filesystem MCP servers
There are several alternative Node-based filesystem MCP implementations, useful to study different designs and security models:

@gabrielmaialva33/mcp-filesystem  

Install globally:npm install -g @gabrielmaialva33/mcp-filesystem

Run:mcp-filesystem /path/to/allowed/directory

Or with npx:npx @gabrielmaialva33/mcp-filesystem /path/to/allowed/directory



@shtse8/filesystem-mcp (and similar packages)  

Example client config:{
  "mcpServers": {
    "filesystem-mcp": {
      "command": "node",
      "args": ["/path/to/filesystem-mcp/build/index.js"],
      "name": "Filesystem (Local Build)"
    }
  }
}



Other Node-based filesystem MCP repos (e.g., hardened/specialized variants) also follow the same pattern: node dist/index.js --root /path/to/workspace.


These are good if you want to:

Read and modify the server code.
Compare different security constraints (allowed paths, read-only modes, etc.).
Practice building and publishing your own Node MCP servers.


3. Docker + Node pattern
If you prefer your MCP filesystem server to run inside Docker but still be Node-based, a common pattern is:

Base image:
FROM node:20-alpine

WORKDIR /app
RUN npm install -g @modelcontextprotocol/server-filesystem

CMD ["mcp-server-filesystem", "/workspace"]

Bind-mount your host directory when you run it:
docker build -t my-node-mcp-filesystem .
docker run -i --rm -v /host/path:/workspace my-node-mcp-filesystem

Point your client (VS Code MCP config) at Docker:
{
  "mcpServers": {
    "filesystem-docker": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-v",
        "/host/path:/workspace",
        "my-node-mcp-filesystem"
      ]
    }
  }
}


That gives you: Node-based MCP server + Docker isolation + host VS Code as client, 
which is exactly the kind of integration pattern you’d design as an AI architect.
