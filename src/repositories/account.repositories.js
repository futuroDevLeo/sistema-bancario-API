import Account from "../models/Account.js";

import bancodedados from '../database/db.connection.js';

const findAll = () => Account.find();

const createAccount = (accountObject) => Account.create(accountObject);
// Precisa mudar
const findAccount = (accontnumber) => {
    bancodedados.contas.find(conta => conta.usuario.numero === accontnumber);
}

export default {
    findAll,
    createAccount,
    findAccount
};