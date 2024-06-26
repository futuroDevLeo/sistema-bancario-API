import { Request, Response, NextFunction } from 'express';
import accountServices from "../services/account.services.ts";
import accountRepositories from "../repositories/account.repositories.ts";

const getAllAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allAccounts = await accountServices.listAccountsService(accountRepositories);
        return res.status(200).json(allAccounts);
    } catch (e) {
        return next(e);
    }
}

const postAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await accountServices.createAccountService(req.body, accountRepositories);
        return res.status(201).send();
    } catch (e) {
        return next(e);
    }
}

const putUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await accountServices.updateUserService(req.body, req.params.numeroConta, accountRepositories);
        return res.status(200).send();
    } catch (e) {
        return next(e);
    }
}

const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await accountServices.deleteAccountService(req.params.numeroConta, accountRepositories);
        return res.status(200).send();
    } catch (e) {
        return next(e);
    }
}

export default {
    getAllAccounts,
    postAccount,
    putUser,
    deleteAccount
}
