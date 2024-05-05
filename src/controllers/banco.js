import bancodedados from '../data/bancodedados.js';
import { format } from 'date-fns';

function buscarConta(numeroconta) {
    const contaExiste = bancodedados.contas.find(conta => conta.numero === numeroconta)
    return contaExiste
}

const listarContas = (req, res) => {
    return res.status(200).json(bancodedados.contas)
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' })
    }

    const contaExistente = bancodedados.contas.find(conta => {
        return conta.usuario.cpf === cpf || conta.usuario.email === email
    })

    if (contaExistente) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' })
    }

    let numero = "1"

    if (bancodedados.contas.length != 0) {
        numero = String(Number(bancodedados.contas[bancodedados.contas.length - 1].numero) + 1)
    }

    const saldoInicial = 0

    const novaConta = {
        numero,
        saldo: saldoInicial,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha,
        }
    }

    bancodedados.contas.push(novaConta)

    return res.status(201).send()
}

const atualizarUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    const numeroConta = req.params.numeroConta

    const contaAtualizar = buscarConta(numeroConta)

    if (!contaAtualizar) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' })
    }

    const contaExistente = bancodedados.contas.find(conta => {
        return (conta.usuario.cpf === cpf || conta.usuario.email === email) && conta.numero !== numeroConta
    })

    if (contaExistente) {
        return res.status(400).json({ mensagem: 'O CPF ou o Email informado já existe cadastrado!' })
    }

    const usuarioAtualizado = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    }

    contaAtualizar.usuario = usuarioAtualizado

    return res.status(200).send()
}

const excluirConta = (req, res) => {
    const numeroConta = req.params.numeroConta

    const contaDeletar = buscarConta(numeroConta)

    if (!contaDeletar) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' })
    }

    if (contaDeletar.saldo !== 0) {
        return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' })
    }

    const indiceConta = bancodedados.contas.indexOf(contaDeletar)
    bancodedados.contas.splice(indiceConta, 1)

    return res.status(200).send();
}

const fazerDeposito = (req, res) => {
    const { numero_conta, valor } = req.body

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!' })
    }

    const contaDepositar = buscarConta(numero_conta)

    if (!contaDepositar) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' })
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor do depósito deve ser maior que zero.' })
    }

    contaDepositar.saldo += valor

    const dataTransacao = format(new Date(), "yyyy-MM-dd HH:mm:ss")

    const registroTransacao = {
        data: dataTransacao,
        numero_conta,
        valor
    }

    bancodedados.depositos.push(registroTransacao)

    return res.status(200).send()
}

const fazerSaque = (req, res) => {
    const { numero_conta, valor, senha } = req.body

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, o valor e a senha são obrigatórios!' })
    }

    const contaSaque = buscarConta(numero_conta)

    if (!contaSaque) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' })
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor do saque deve ser maior que zero.' })
    }

    if (senha !== contaSaque.usuario.senha) {
        return res.status(401).json({ mensagem: 'Senha incorreta.' })
    }

    if (valor > contaSaque.saldo) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente.' })
    }

    contaSaque.saldo -= valor

    const dataTransacao = format(new Date(), "yyyy-MM-dd HH:mm:ss")

    const registroTransacao = {
        data: dataTransacao,
        numero_conta,
        valor
    }

    bancodedados.saques.push(registroTransacao)

    return res.status(200).send()
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta de origem, número da conta de destino, valor e senha são obrigatórios!' })
    }

    const contaOrigem = buscarConta(numero_conta_origem)
    const contaDestino = buscarConta(numero_conta_destino)

    if (!contaOrigem) {
        return res.status(404).json({ mensagem: 'Conta de origem não encontrada.' })
    }

    if (!contaDestino) {
        return res.status(404).json({ mensagem: 'Conta de destino não encontrada.' })
    }

    if (contaOrigem === contaDestino) {
        return res.status(400).json({ mensagem: 'Não é possivel transferir valores para a mesma conta.' })
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor da transferência deve ser maior que zero.' })
    }

    if (senha !== contaOrigem.usuario.senha) {
        return res.status(401).json({ mensagem: 'Senha incorreta.' })
    }

    if (valor > contaOrigem.saldo) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente para a transferência.' })
    }

    contaOrigem.saldo -= valor
    contaDestino.saldo += valor

    const dataTransacao = format(new Date(), "yyyy-MM-dd HH:mm:ss")

    const registroTransacao = {
        data: dataTransacao,
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    bancodedados.transferencias.push(registroTransacao)

    return res.status(200).send()
}

const consultarSaldo = (req, res) => {
    const { numero_conta } = req.query

    const conta = buscarConta(numero_conta)

    return res.status(200).json({ saldo: conta.saldo })
}

const consultarExtrato = (req, res) => {
    const { numero_conta } = req.query

    const extrato = {
        depositos: bancodedados.depositos.filter(deposito => deposito.numero_conta === numero_conta),
        saques: bancodedados.saques.filter(saque => saque.numero_conta === numero_conta),
        transferenciasEnviadas: bancodedados.transferencias.filter(transf => transf.numero_conta_origem === numero_conta),
        transferenciasRecebidas: bancodedados.transferencias.filter(transf => transf.numero_conta_destino === numero_conta)
    }

    return res.status(200).json(extrato);
}

export default {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    fazerDeposito,
    fazerSaque,
    transferir,
    consultarSaldo,
    consultarExtrato
}
