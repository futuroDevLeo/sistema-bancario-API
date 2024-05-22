const checkBalanceService = async (accountNumber: string, repositories: any) => {
    const [bankAccount] = await repositories.findByAccountNumber(accountNumber);
    if (!bankAccount) throw new Error('Bank Account not found.');
    return { balance: bankAccount.balance };
}

// PRECISA EDITAR DAQUI PRA BAIXO

// const checkExtractService = (numero_conta) => {
//     return {
//         depositos: bancodedados.depositos.filter(deposito => deposito.numero_conta === numero_conta),
//         saques: bancodedados.saques.filter(saque => saque.numero_conta === numero_conta),
//         transferenciasEnviadas: bancodedados.transferencias.filter(transf => transf.numero_conta_origem === numero_conta),
//         transferenciasRecebidas: bancodedados.transferencias.filter(transf => transf.numero_conta_destino === numero_conta)
//     }
// }

export default {
    checkBalanceService,
    // checkExtractService
}
