import express from 'express';
import routes from './routes.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('', routes);

app.listen(PORT, () => console.log(`Server is running now http://localhost:${PORT}`));