import Account from "../models/Account.js";

const findAll = () => Account.find();

const createAccount = (accountObject) => Account.create(accountObject);

const findByAccountNumber = (accountnumber) => Account.find({ "accountNumber": accountnumber });

const findByCpf = (cpf) => Account.find({ "user.cpf": cpf });

const findByEmail = (email) => Account.find({ "user.email": email });

const deleteAccount = (accountObject) => Account.deleteOne(accountObject);

const updateUser = (userObject) => {
    const { accountNumber, user } = userObject;

    return Account.updateOne(
        { "accountNumber": accountNumber },
        { $set: { "user": user } }
    );
}


export default {
    findAll,
    createAccount,
    findByAccountNumber,
    findByCpf,
    findByEmail,
    deleteAccount,
    updateUser
};