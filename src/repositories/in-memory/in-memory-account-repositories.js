let db = [];

const findAll = () => db;

const createAccount = (newAccount) => db.push(newAccount);

const findByEmail = (email) => db.filter(account => account.user.email === email);

const findByCpf = (cpf) => db.filter(account => account.user.cpf === cpf);

export default {
    db,
    findAll,
    createAccount,
    findByEmail,
    findByCpf
}