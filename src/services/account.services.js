import bancodedados from '../database/db.connection.js';
import accountRepositories from "../repositories/account.repositories.js";
import { format } from 'date-fns';

const listAccountsService = async () => {
    const allAccounts = await accountRepositories.findAll();
    if (allAccounts.length == 0) throw new Error('There are no registered accounts.');
    return allAccounts
}

const createAccountService = ({ name, cpf, birthdate, phonenumber, email, password }) => {
    // const contaExistente = bancodedados.contas.find(conta => {
    //     return conta.usuario.cpf === cpf || conta.usuario.email === email
    // });

    // if (contaExistente) throw new Error('Já existe uma conta com o cpf ou e-mail informado!');

    let accountNumber = 1;

    // if (bancodedados.contas.length != 0) {
    //     numero = String(Number(bancodedados.contas[bancodedados.contas.length - 1].numero) + 1);
    // }

    return {
        accountNumber: accountNumber++,
        balance: 0,
        user: {
            name,
            cpf,
            birthdate,
            phonenumber,
            email,
            password,
        }
    }
}

const deleteAccountService = (numeroConta) => {
    const contaDeletar = findAccount(numeroConta);

    if (!contaDeletar) throw new Error('Conta não encontrada.');

    if (contaDeletar.saldo !== 0) throw new Error('Por favor, retire o dinhero da conta antes de deleta-la!');

    const indiceConta = bancodedados.contas.indexOf(contaDeletar);
    return bancodedados.contas.splice(indiceConta, 1);
}

const updateUserService = ({ nome, cpf, data_nascimento, telefone, email, senha }, numeroConta) => {
    const contaAtualizar = findAccount(numeroConta)

    if (!contaAtualizar) throw new Error('Conta não encontrada.');

    const contaExistente = bancodedados.contas.find(conta => {
        return (conta.usuario.cpf === cpf || conta.usuario.email === email) && conta.numero !== numeroConta
    })

    if (contaExistente) throw new Error('Já existe cadastrado para o CPF ou o Email informado!');

    return {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    }
}

const makeDepositService = ({ numero_conta, valor }) => {
    if (!numero_conta || !valor) throw new Error('O número da conta e o valor são obrigatórios!');

    const contaDepositar = findAccount(numero_conta);

    if (!contaDepositar) throw new Error('Conta não encontrada.');

    if (valor <= 0) throw new Error('O valor do depósito deve ser maior que zero.');

    contaDepositar.saldo += valor;

    const dataTransacao = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    return {
        data: dataTransacao,
        numero_conta,
        valor
    }
}

const makeWithdrawalService = ({ numero_conta, valor, senha }) => {
    if (!numero_conta || !valor || !senha)
        throw new Error('O número da conta, o valor e a senha são obrigatórios!');

    const contaSaque = findAccount(numero_conta);

    if (!contaSaque) throw new Error('Conta não encontrada.');

    if (valor <= 0) throw new Error('O valor do saque deve ser maior que zero.');

    if (senha !== contaSaque.usuario.senha) throw new Error('Senha incorreta.');

    if (valor > contaSaque.saldo) throw new Error('Saldo insuficiente.');

    contaSaque.saldo -= valor;

    const dataTransacao = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    return {
        data: dataTransacao,
        numero_conta,
        valor
    }
}

const makeTransferService = ({ numero_conta_origem, numero_conta_destino, valor, senha }) => {
    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha)
        throw new Error('O número da conta de origem, número da conta de destino, valor e senha são obrigatórios!');

    const contaOrigem = findAccount(numero_conta_origem);
    const contaDestino = findAccount(numero_conta_destino);

    if (!contaOrigem) throw new Error('Conta de origem não encontrada.');

    if (!contaDestino) throw new Error('Conta de destino não encontrada.');

    if (contaOrigem === contaDestino) throw new Error('Não é possivel transferir valores para a mesma conta.');

    if (valor <= 0) throw new Error('O valor da transferência deve ser maior que zero.');

    if (senha !== contaOrigem.usuario.senha) throw new Error('Senha incorreta.');

    if (valor > contaOrigem.saldo) throw new Error('Saldo insuficiente para a transferência.');

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const dataTransacao = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    return {
        data: dataTransacao,
        numero_conta_origem,
        numero_conta_destino,
        valor
    }
}

const checkBalanceService = (numero_conta) => {
    const conta = findAccount(numero_conta);

    return { saldo: conta.saldo }
}

const checkExtractService = (numero_conta) => {
    return {
        depositos: bancodedados.depositos.filter(deposito => deposito.numero_conta === numero_conta),
        saques: bancodedados.saques.filter(saque => saque.numero_conta === numero_conta),
        transferenciasEnviadas: bancodedados.transferencias.filter(transf => transf.numero_conta_origem === numero_conta),
        transferenciasRecebidas: bancodedados.transferencias.filter(transf => transf.numero_conta_destino === numero_conta)
    }
}

export default {
    listAccountsService,
    createAccountService,
    deleteAccountService,
    updateUserService,
    makeDepositService,
    makeWithdrawalService,
    makeTransferService,
    checkBalanceService,
    checkExtractService
}
