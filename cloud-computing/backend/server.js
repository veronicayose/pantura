import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('', routes);

app.listen(PORT, () => console.log(`Server is running now http://localhost:${PORT}`));