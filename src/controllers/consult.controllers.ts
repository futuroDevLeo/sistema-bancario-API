import { Request, Response, NextFunction } from "express";
import consultServices from "../services/consult.services.ts";
import accountRepositories from "../repositories/account.repositories.ts";

const getBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // A SENHA DEVE SER VALIDADA NO MIDDLEWARE
        const balance = await consultServices.checkBalanceService(req.body.accountNumber, accountRepositories)
        return res.status(200).json(balance);
    } catch (e) {
        return next(e);
    }
}

// PRECISA EDITAR DAQUI PRA BAIXO

// const consultarExtrato = (req, res) => {
//     try {
//         const extrato = services.checkExtractService(req.query);
//         return res.status(200).json(extrato);
//     } catch (error) {
//         return res.status(500).json(error.message);
//     }
// }

export default {
    getBalance
}