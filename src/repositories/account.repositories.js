import bancodedados from '../database/bancodedados.js';

const findAccount = (accontnumber) => {
    bancodedados.contas.find(conta => conta.usuario.numero === accontnumber);
}

export default findAccount;