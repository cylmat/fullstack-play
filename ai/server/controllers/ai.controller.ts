import { type Request, type Response } from 'express';
import { fetchFromMCP } from '../utils/fetchFromMCP.ts';
import { parseSSEData } from '../utils/parseSSEdata.ts';
import anthropicService from '../services/anth.service.ts';

export const aiController = {

  postChat: (req: Request, res: Response) => { //, err: Error, next: NextFunction) => {
   
    try {
        // const user = 
        res
            .status(200)
            .send('Hello from AI controller!');
        
    } catch (error) {
        // Handle the error appropriately
        res
            .status(500)
            .json({ error: (error as Error).message });
    }

    
    // if (err) {
        //   res.status(500).json({ error: err.message });
        // }
    
    // console.log(req.body)
    // const { message } = req.body as { message: string };

    // if (typeof message !== 'string') {
    //   return res.status(400).json({
    //     error: 'Le champ "message" doit être une chaîne de caractères.',
    //   });
    // }

    // console.log("Received message:", message)
    // const replyMessage = `Hello buddy: ${message}!`;

    // res.header('Content-Type', 'application/json');
    // res.json({ message: replyMessage });
  },

  postAnth:  (req: Request, res: Response) => {
     anthropicService()
      .then((data) => {
          res
              .status(200)
              .send('Hello from AI "Anth" controller !');
      })
      .catch((error) => {
        console.log(error)
        res
              .status(500)
              .send('Error from AI "Anth" controller !');
      })
    
  },

  getMCP: (req: Request, res: Response) => {
   // res.send('{"message": "Hello MCP!"}');

   res
            .status(200)
            .send('Hello from AI "MCP" controller !');

//   let result = fetchFromMCP("http://fs-ai-mcpfilesystem:8123/mcp", {
//       "jsonrpc": "2.0",
//       "method": "initialize",
//       "params": {
//         "protocolVersion": "2025-06-18",
//         "capabilities": {},
//         "clientInfo": { "name": "curl-client", "version": "1.0.0" }
//       },
//       "id": 1
//     }).then((rr) => {
//       // console.log("MCP response received", rr.text());
//       return rr.text()
//     }).then((rr2) =>  {
//       console.log("Second then received", parseSSEData(rr2));
//       res.send(JSON.stringify(parseSSEData(rr2)));
//     })

    // {
    //   "jsonrpc": "2.0",
    //   "method": "tools/list",
    //   "params": {},
    //   "id": 2
    // }

    // {
    //   "jsonrpc": "2.0",
    //   "method": "tools/call",
    //   "params": {
    //     "name": "list_directory",
    //     "arguments": {
    //       "path": "/claude"
    //     }
    //   },
    //   "id": 3
    // }
  }


};
