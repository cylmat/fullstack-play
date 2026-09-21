import express, { type Express, type Request, type Response, type NextFunction } from 'express'
import routes from './routes/index.ts';
import dotenv from 'dotenv'

  // @doc url for req.on('data'): https://nodejs.org/api/http.html#http_class_http_incomingmessage
  // @doc url for 'data' node event: https://nodejs.org/api/events.html#event-data

dotenv.config({ path: ['.env.local', '.env'] })
const app: Express = express()

app.use(express.json()) // Mandatory for parsing application/json
app.use(express.urlencoded({ extended: true })); // use it for: parsing application/x-www-form-urlencoded


/** CORS */
// Or use npm install cors and import it

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  // Réponse à la requête preflight
  if (req.method === 'OPTIONS') {
    res.sendStatus(204)
    return
  }

  
  next()
})

app.get('/health', (req: Request, res: Response) => {
  res
    .status(200)
    .send("Health: OK");
})

app.use(routes)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})

  // req.on('data', function (chunk) {
  //       console.log("req.use on data");
  // }).on('end', function () {
  //     console.log("req.use on end");
  // });
  // const replyMessage = `Hello ${message}!`;
  // res.send(`{"message": "${replyMessage}"}`);
