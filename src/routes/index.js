import { Router } from 'express';
import autenticacao from '../middlewares/autenticacao.js';
import accountControllers from '../controllers/account.controllers.js';

const router = Router();

router.get('/contas',
    // autenticacao.autenticarSenha,
    accountControllers.getAllAccounts
);
router.post('/contas',
    autenticacao.validarCamposBody,
    accountControllers.postAccount
);
router.put('/contas/:numeroConta/usuario',
    autenticacao.validarCamposBody,
    accountControllers.putUser
);
router.delete('/contas/:numeroConta',
    accountControllers.deleteAccount
);
// router.post('/transacoes/depositar',
//     // controladoresBanco.fazerDeposito
// );
// router.post('/transacoes/sacar',
//     // controladoresBanco.fazerSaque
// );
// router.post('/transacoes/transferir',
//     // controladoresBanco.transferir
// );
// router.get('/contas/saldo',
//     autenticacao.validarConta,
//     // controladoresBanco.consultarSaldo
// );
// router.get('/contas/extrato',
//     autenticacao.validarConta,
//     // controladoresBanco.consultarExtrato
// );

export default router