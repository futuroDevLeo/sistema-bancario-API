let db: TAccountBank[] = [];

const findAll = () => db;

const createAccount = (newAccount: TAccountBank) => db.push(newAccount);

const findByEmail = (email: string) => db.filter(account => account.user.email === email);

const findByCpf = (cpf: string) => db.filter(account => account.user.cpf === cpf);

const findByAccountNumber = (accountNumber: string) => db.filter(account => account.accountNumber === accountNumber);

const deleteAccount = (accountObject: TAccountBank) => {
    const index = db.findIndex(account => account.accountNumber === accountObject.accountNumber);
    if (index !== -1) {
        db.splice(index, 1);
        return true;
    }
    return false;
};

const updateUser = (userObject: Partial<TAccountBank>) => {
    const { accountNumber, user } = userObject;
    const accountIndex = db.findIndex(account => account.accountNumber === accountNumber);
    if (accountIndex !== -1) {
        if (user) {
            db[accountIndex].user = user;
            return
        }
    }
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