import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import router from './routes/index.ts'
import connectDatabase from './config/db.connection.ts';

const app = express();

connectDatabase();
app.use(express.json());
app.use(cors());
app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error.message === "All fields are mandatory."
        || error.message === 'An account already exists with the CPF or email provided.'
        || error.message === 'Balance greater than zero.') {
        return res.status(400).json(error.message);
    }
    if (error.message === 'There are no registered accounts.'
        || error.message === 'Bank Account not found.') {
        return res.status(404).json(error.message);
    }
    if (error.message === 'Incorrect Password.') {
        return res.status(401).json(error.message);
    }
    return res.status(500).json(error.message);
});

export default app;