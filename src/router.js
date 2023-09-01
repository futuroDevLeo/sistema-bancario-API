const { Router } = require('express');
const autenticacao = require('./middlewares/autenticacao');
const controladoresBanco = require('./controllers/banco')

const router = Router();

router.get('/contas', autenticacao.autenticarSenha, controladoresBanco.listarContas);
router.post('/contas', autenticacao.validarCamposBody, controladoresBanco.criarConta);
router.put('/contas/:numeroConta/usuario', autenticacao.validarCamposBody, controladoresBanco.atualizarUsuario);
router.delete('/contas/:numeroConta', controladoresBanco.excluirConta);
router.post('/transacoes/depositar', controladoresBanco.fazerDeposito);
router.post('/transacoes/sacar', controladoresBanco.fazerSaque);
router.post('/transacoes/transferir', controladoresBanco.transferir);
router.get('/contas/saldo', autenticacao.validarConta, controladoresBanco.consultarSaldo);
router.get('/contas/extrato', autenticacao.validarConta, controladoresBanco.consultarExtrato);

module.exports = router