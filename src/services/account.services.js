import accountRepositories from "../repositories/account.repositories.js";

const listAccountsService = async () => {
    const allAccounts = await accountRepositories.findAll();
    if (allAccounts.length == 0) throw new Error('There are no registered accounts.');
    return allAccounts;
}

const createAccountService = async ({ name, cpf, birthdate, phonenumber, email, password }) => {
    const [emailDatabase, cpfDatabase] = await Promise.all([
        accountRepositories.findByEmail(email),
        accountRepositories.findByCpf(cpf),
    ]);

    if (emailDatabase.length > 0 || cpfDatabase.length > 0)
        throw new Error('An account already exists with the CPF or email provided.');

    const allAccounts = await accountRepositories.findAll();

    let accountNumber = 1;

    if (allAccounts.length != 0) {
        const lastAccount = allAccounts[allAccounts.length - 1];
        accountNumber = Number(lastAccount.accountNumber) + 1;
    }

    const createdAt = new Date();

    const newAccount = {
        accountNumber,
        balance: 0,
        createdAt,
        user: {
            name,
            cpf,
            birthdate,
            phonenumber,
            email,
            password,
        }
    }

    await accountRepositories.createAccount(newAccount);

    return;
}

const deleteAccountService = async (accountNumber) => {
    const [accountToDelete, ..._] = await accountRepositories.findByAccountNumber(accountNumber);

    if (!accountToDelete) throw new Error('Bank Account not found.');

    if (accountToDelete.balance !== 0) throw new Error('Balance greater than zero.');

    await accountRepositories.deleteAccount(accountToDelete);

    return;
}

const updateUserService = async ({ name, cpf, birthdate, phonenumber, email, password }, accountNumber) => {
    const [accountExists, ..._] = await accountRepositories.findByAccountNumber(accountNumber);

    if (!accountExists) throw new Error('Bank Account not found.');

    const [emailDatabase, cpfDatabase] = await Promise.all([
        accountRepositories.findByEmail(email),
        accountRepositories.findByCpf(cpf),
    ]);

    if (emailDatabase[0]) {
        if (emailDatabase[0].user.email !== accountExists.user.email)
            throw new Error('An account already exists with the CPF or email provided.');
    }

    if (cpfDatabase[0]) {
        if (cpfDatabase[0].user.cpf !== accountExists.user.cpf)
            throw new Error('An account already exists with the CPF or email provided.');
    }

    const userToUpdate = {
        accountNumber: accountExists.accountNumber,
        user: {
            name,
            cpf,
            birthdate,
            phonenumber,
            email,
            password
        }
    }

    await accountRepositories.updateUser(userToUpdate);

    return;
}

export default {
    listAccountsService,
    createAccountService,
    deleteAccountService,
    updateUserService
}
