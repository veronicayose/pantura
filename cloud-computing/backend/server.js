import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import * as dotenv from 'dotenv';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('', routes);

app.listen(PORT, () => console.log(`Server is running now http://localhost:${PORT}`));