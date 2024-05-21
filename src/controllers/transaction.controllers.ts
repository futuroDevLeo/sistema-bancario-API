import transactionServices from "../services/transaction.services.js";

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