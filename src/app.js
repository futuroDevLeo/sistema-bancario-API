import express from 'express';
import cors from "cors";
import router from './routes/index.js'
import connectDatabase from './database/db.connection.js';

const app = express();

connectDatabase();
app.use(express.json());
app.use(cors());
app.use(router);

app.use(function (error, req, res, next) {
    if (error.message === "All fields are mandatory.") {
        return res.status(400).json(error.message);
    }
    if (error.message === 'There are no registered accounts.') {
        return res.status(404).json(error.message);
    }
    return res.status(500).json(error.message);
});

export default app;