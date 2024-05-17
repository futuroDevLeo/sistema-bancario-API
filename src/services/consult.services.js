// PRECISA EDITAR DAQUI PRA BAIXO

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
    checkBalanceService,
    checkExtractService
}
