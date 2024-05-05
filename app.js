import express from 'express';
import cors from "cors";
import router from './src/routes/index.js'
import connectDatabase from './src/database/db.connection.js';

const app = express();

connectDatabase();
app.use(express.json());
app.use(cors());
app.use(router);

export default app;