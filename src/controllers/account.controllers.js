import services from "../services/account.services.js";
import accountRepositories from "../repositories/account.repositories.js";

const listarContas = async (req, res) => {
    try {
        const allAccounts = await services.listAccountsService();
        return res.status(200).json(allAccounts);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const criarConta = async (req, res) => {
    try {
        const novaConta = services.createAccountService(req.body);
        await accountRepositories.createAccount(novaConta);
        return res.status(201).send();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const excluirConta = (req, res) => {
    try {
        services.deleteAccountService(req.params.numeroConta);
        return res.status(200).send();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const atualizarUsuario = (req, res) => {
    try {
        const contaAtualizar = services.updateUserService(req.body, req.params.numeroConta);
        contaAtualizar.usuario = usuarioAtualizado;
        return res.status(200).send();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

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
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    fazerDeposito,
    fazerSaque,
    transferir,
    consultarSaldo,
    consultarExtrato
}
