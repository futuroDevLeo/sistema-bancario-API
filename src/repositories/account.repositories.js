import Account from "../models/Account.js";

const findAll = () => Account.find();

const createAccount = (accountObject) => Account.create(accountObject);

const findByAccountNumber = (accountnumber) => Account.find(accountnumber);

const findByCpf = (cpf) => Account.find({ "user.cpf": cpf });

const findByEmail = (email) => Account.find({ "user.email": email });


export default {
    findAll,
    createAccount,
    findByAccountNumber,
    findByCpf,
    findByEmail
};