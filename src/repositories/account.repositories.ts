import Account from "../models/Account.ts";

const findAll = () => Account.find();

// CRIAR TIPO ACCOUNT

const createAccount = (accountObject: TAccountBank) => Account.create(accountObject);

const findByAccountNumber = (accountnumber: String) => Account.find({ "accountNumber": accountnumber });

const findByCpf = (cpf: string) => Account.find({ "user.cpf": cpf });

const findByEmail = (email: string) => Account.find({ "user.email": email });

const deleteAccount = (accountObject: TAccountBank) => Account.deleteOne(accountObject);

// CRIAR TIPO USER

const updateUser = (userObject: Partial<TAccountBank>) => {
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