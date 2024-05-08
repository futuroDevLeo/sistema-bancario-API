import { Router } from 'express';
import autenticacao from '../middlewares/autenticacao.js';
import controladoresBanco from '../controllers/account.controllers.js';

const router = Router();

router.get('/contas',
    // autenticacao.autenticarSenha,
    controladoresBanco.allAccountsGet
);
router.post('/contas',
    autenticacao.validarCamposBody,
    controladoresBanco.accountPost
);
router.put('/contas/:numeroConta/usuario',
    autenticacao.validarCamposBody,
    controladoresBanco.atualizarUsuario
);
router.delete('/contas/:numeroConta', controladoresBanco.excluirConta);
router.post('/transacoes/depositar', controladoresBanco.fazerDeposito);
router.post('/transacoes/sacar', controladoresBanco.fazerSaque);
router.post('/transacoes/transferir', controladoresBanco.transferir);
router.get('/contas/saldo', autenticacao.validarConta, controladoresBanco.consultarSaldo);
router.get('/contas/extrato', autenticacao.validarConta, controladoresBanco.consultarExtrato);

export default router