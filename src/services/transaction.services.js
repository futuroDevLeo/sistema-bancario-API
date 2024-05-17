// PRECISA EDITAR DAQUI PRA BAIXO

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

export default {
    makeDepositService,
    makeWithdrawalService,
    makeTransferService
}