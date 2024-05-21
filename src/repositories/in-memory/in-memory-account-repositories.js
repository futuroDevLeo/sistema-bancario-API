let db = [];

const findAll = () => db;

const createAccount = (newAccount) => db.push(newAccount);

const findByEmail = (email) => db.filter(account => account.user.email === email);

const findByCpf = (cpf) => db.filter(account => account.user.cpf === cpf);

const findByAccountNumber = (accountNumber) => db.filter(account => account.accountNumber === accountNumber);

const deleteAccount = (accountObject) => {
    const index = db.findIndex(account => account.accountNumber === accountObject.accountNumber);
    if (index !== -1) {
        db.splice(index, 1);
        return true;
    }
    return false;
};

const updateUser = (userObject) => {
    const { accountNumber, user } = userObject;
    const account = db.find(account => account.accountNumber === accountNumber);
    if (account) {
        account.user = user;
        return true;
    }
    return false;
};

export default {
    db,
    findAll,
    createAccount,
    findByEmail,
    findByCpf,
    findByAccountNumber,
    deleteAccount,
    updateUser
}