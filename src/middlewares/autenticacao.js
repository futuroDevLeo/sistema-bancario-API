const bancodedados = require('../data/bancodedados');

const autenticarSenha = (req, res, next) => {
    const senhaBanco = req.query.senha_banco

    if (!senhaBanco || senhaBanco !== bancodedados.banco.senha) {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" })
    }

    next()
}

const validarCamposBody = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' })
    }

    next()
}

module.exports = {
    autenticarSenha,
    validarCamposBody
}