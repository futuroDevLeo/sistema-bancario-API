import bancodedados from '../database/db.connection.js';

const findAccount = (accontnumber) => {
    bancodedados.contas.find(conta => conta.usuario.numero === accontnumber);
}

export default findAccount;