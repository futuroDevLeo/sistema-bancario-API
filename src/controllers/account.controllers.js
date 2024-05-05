import bancodedados from '../database/bancodedados.js';
import services from "../services/account.services.js";

const listarContas = (req, res) => {
    return res.status(200).json(services.listAccountsService());
}

const criarConta = (req, res) => {
    const novaConta = services.createAccountService(req.body);
    bancodedados.contas.push(novaConta);
    return res.status(201).send();
}

const excluirConta = (req, res) => {
    services.deleteAccountService(req.params.numeroConta);
    return res.status(200).send();
}

const atualizarUsuario = (req, res) => {
    const contaAtualizar = services.updateUserService(req.body, req.params.numeroConta);
    contaAtualizar.usuario = usuarioAtualizado;
    return res.status(200).send();
}

const fazerDeposito = (req, res) => {
    const registroTransacao = services.makeDepositService(req.body);
    bancodedados.depositos.push(registroTransacao);
    return res.status(200).send();
}

const fazerSaque = (req, res) => {
    const registroTransacao = services.makeWithdrawalService(req.body);
    bancodedados.saques.push(registroTransacao);
    return res.status(200).send();
}

const transferir = (req, res) => {
    const registroTransacao = services.makeTransferService(req.body);
    bancodedados.transferencias.push(registroTransacao);
    return res.status(200).send();
}

const consultarSaldo = (req, res) => {
    return res.status(200).json(services.checkBalanceService(req.query))
}

const consultarExtrato = (req, res) => {
    const extrato = services.checkExtractService(req.query);
    return res.status(200).json(extrato);
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
