import express, {
    type Express,
    type Request,
    type Response
} from 'express';
import corsMiddleware from './middlewares/cors.middleware.ts';
import authMiddleware from './middlewares/auth.middleware.ts';
import dotenv from 'dotenv';
import routes from './routes/index.ts';

// @doc url for req.on('data'): https://nodejs.org/api/http.html#http_class_http_incomingmessage
// @doc url for 'data' node event: https://nodejs.org/api/events.html#event-data

dotenv.config({ path: ['.env.local', '.env'] });
const app: Express = express();

app.use(express.json()); // Mandatory for parsing application/json
app.use(express.urlencoded({ extended: true })); // use it for: parsing application/x-www-form-urlencoded

// @doc https://expressjs.com/fr/resources/middleware/

app.use(corsMiddleware); // MUST BE FIRST !

app.use(authMiddleware)
app.use(routes);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('Health: OK');
});

app.listen(3000, () => {
    console.info('APP | Server is running on http://localhost:3000');
});
