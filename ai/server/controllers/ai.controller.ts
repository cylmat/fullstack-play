import { type Request, type Response } from 'express';
import anthropicService from '../services/anth.service.ts';

export const aiController = {

  postChat: async (req: Request, res: Response) => { //, err: Error, next: NextFunction) => {

    const { message } = req.body as { message: string };
    if (typeof message !== 'string') {
      return res.status(400).json({
        error: 'Le champ "message" doit être une chaîne de caractères.',
      });
    }

   

    try {
        const datas: string[] = await anthropicService(message)
        //  console.log('controller', datas)
        res
            .status(200)
            .header('Content-Type', 'application/json')
            .json({ data: datas });
    } catch (error) {
        res
            .status(500)
            .header('Content-Type', 'application/json')
            .json({ error: (error as Error).message });
    }
  },

  // postAnth:  (req: Request, res: Response) => {
  //    anthropicService('test prompt')
  //     .then((data) => {
  //         res
  //             .status(200)
  //             .send('Hello from AI "Anth" controller !');
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       res
  //             .status(500)
  //             .send('Error from AI "Anth" controller !');
  //             // .json({ error: (error as Error).message });
  //     })
    
  // },

  getMCP: (req: Request, res: Response) => {
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
