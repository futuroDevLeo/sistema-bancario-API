// const autenticarSenha = (req, res, next) => {
//     const senhaBanco = req.query.senha_banco

//     if (!senhaBanco || senhaBanco !== bancodedados.banco.senha) {
//         return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" })
//     }

//     next()
// }

const validarCamposBody = (req, res, next) => {
    const { name, cpf, birthdate, phonenumber, email, password } = req.body

    if (!name || !cpf || !birthdate || !phonenumber || !email || !password) throw new Error('All fields are mandatory.')

    next()
}

const validarConta = (req, res, next) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) throw new Error('All fields are mandatory.');

    // PRECISA MUDAR PARA VERIFICAR NO BANCO DE DADOS
    const conta = bancodedados.contas.find(conta => conta.numero === numero_conta);

    if (!conta) throw new Error('Bank Account not found.');

    // PRECISA MUDAR A CONDIÇÃO
    if (senha !== conta.usuario.senha) throw new Error('Incorrect Password.');

    next()
}

export default {
    // autenticarSenha,
    validarCamposBody,
    validarConta
}