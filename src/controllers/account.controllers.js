import services from "../services/account.services.js";
import accountRepositories from "../repositories/account.repositories.js";

const getAllAccounts = async (req, res, next) => {
    try {
        const allAccounts = await services.listAccountsService();
        return res.status(200).json(allAccounts);
    } catch (e) {
        next(e);
    }
}

const postAccount = async (req, res, next) => {
    try {
        const newAccount = await services.createAccountService(req.body);
        await accountRepositories.createAccount(newAccount);
        return res.status(201).send();
    } catch (e) {
        next(e);
    }
}

const deleteAccount = async (req, res, next) => {
    try {
        const accountToDelete = await services.deleteAccountService(req.params.numeroConta);
        await accountRepositories.deleteAccount(accountToDelete);
        return res.status(200).send();
    } catch (e) {
        next(e);
    }
}

const putUser = async (req, res, next) => {
    try {
        const userToUpdate = await services.updateUserService(req.body, req.params.numeroConta);
        await accountRepositories.updateUser(userToUpdate);
        return res.status(200).send();
    } catch (e) {
        next(e);
    }
}

// PRECISA EDITAR DAQUI PRA BAIXO

const fazerDeposito = (req, res) => {
    try {
        const registroTransacao = services.makeDepositService(req.body);
        bancodedados.depositos.push(registroTransacao);
        return res.status(200).send();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const fazerSaque = (req, res) => {
    try {
        const registroTransacao = services.makeWithdrawalService(req.body);
        bancodedados.saques.push(registroTransacao);
        return res.status(200).send();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const transferir = (req, res) => {
    try {
        const registroTransacao = services.makeTransferService(req.body);
        bancodedados.transferencias.push(registroTransacao);
        return res.status(200).send();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const consultarSaldo = (req, res) => {
    try {
        return res.status(200).json(services.checkBalanceService(req.query));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const consultarExtrato = (req, res) => {
    try {
        const extrato = services.checkExtractService(req.query);
        return res.status(200).json(extrato);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export default {
    getAllAccounts,
    postAccount,
    putUser,
    deleteAccount,
    fazerDeposito,
    fazerSaque,
    transferir,
    consultarSaldo,
    consultarExtrato
}
