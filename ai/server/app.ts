import express, { type Express, type Request, type Response } from 'express'

const app: Express = express()

/** CORS */
// Or use npm install cors and import it

app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  // Réponse à la requête preflight
  if (req.method === 'OPTIONS') {
    res.sendStatus(204)
    return
  }

  next()
})

app.get('/', (req: Request, res: Response) => {
  res.header('Content-Type', 'application/json');
  res.send('{"message": "Hello World!"}');
})

app.listen(3000)
