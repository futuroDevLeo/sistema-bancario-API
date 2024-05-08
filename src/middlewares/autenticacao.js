import bancodedados from '../database/db.connection.js';

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
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios!' })
    }

    const conta = bancodedados.contas.find(conta => conta.numero === numero_conta)

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' })
    }

    if (senha !== conta.usuario.senha) {
        return res.status(401).json({ mensagem: 'Senha incorreta.' })
    }

    next()
}

export default {
    // autenticarSenha,
    validarCamposBody,
    validarConta
}