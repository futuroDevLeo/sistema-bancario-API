import bancodedados from '../database/bancodedados.js';

function findAccount(accountNumber) {
    const contaExiste = bancodedados.contas.find(conta => conta.numero === accountNumber);
    return contaExiste;
}

export default findAccount;