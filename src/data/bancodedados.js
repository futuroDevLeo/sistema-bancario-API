module.exports = {
    banco: {
        nome: 'Cubos Bank',
        numero: '123',
        agencia: '0001',
        senha: 'Cubos123Bank'
    },
    contas: [
        {
            numero: "1",
            saldo: 200,
            usuario: {
                nome: "Foo Bar",
                cpf: "00011122234",
                data_nascimento: "2021-03-15",
                telefone: "71999998888",
                email: "foo@bar.com",
                senha: "12345"
            }
        },
        {
            numero: "2",
            saldo: 1000,
            usuario: {
                nome: "Foo Bar 2",
                cpf: "11111122234",
                data_nascimento: "2021-03-15",
                telefone: "73999998888",
                email: "foo@bar2.com",
                senha: "12345"
            }
        }
    ],
    saques: [],
    depositos: [],
    transferencias: []
}