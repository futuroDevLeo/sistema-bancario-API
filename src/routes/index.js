import { Router } from 'express';
import autenticacao from '../middlewares/autenticacao.js';
import bankcontrollers from '../controllers/account.controllers.js';

const router = Router();

router.get('/contas',
    // autenticacao.autenticarSenha,
    bankcontrollers.getAllAccounts
);
router.post('/contas',
    autenticacao.validarCamposBody,
    bankcontrollers.postAccount
);
router.put('/contas/:numeroConta/usuario',
    autenticacao.validarCamposBody,
    bankcontrollers.putUser
);
router.delete('/contas/:numeroConta',
    bankcontrollers.deleteAccount
);
router.post('/transacoes/depositar',
    // controladoresBanco.fazerDeposito
);
router.post('/transacoes/sacar',
    // controladoresBanco.fazerSaque
);
router.post('/transacoes/transferir',
    // controladoresBanco.transferir
);
router.get('/contas/saldo',
    autenticacao.validarConta,
    // controladoresBanco.consultarSaldo
);
router.get('/contas/extrato',
    autenticacao.validarConta,
    // controladoresBanco.consultarExtrato
);

export default router