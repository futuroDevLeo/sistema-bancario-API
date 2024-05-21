type TAccountBank = {
    accountNumber: string,
    balance: number,
    createdAt: Date,
    user: TUser
};

type TUser = {
    name: string,
    cpf: string,
    birthdate: string,
    phonenumber: string,
    email: string,
    password: string
}