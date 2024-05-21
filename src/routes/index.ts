import { Router } from 'express';
import validationMiddleware from '../middlewares/validation.middleware.ts';
import accountControllers from '../controllers/account.controllers.ts';

const router = Router();

router.get('/contas',
    // autenticacao.autenticarSenha,
    accountControllers.getAllAccounts
);
router.post('/contas',
    validationMiddleware.validateBodyFields,
    accountControllers.postAccount
);
router.put('/contas/:numeroConta/usuario',
    validationMiddleware.validateBodyFields,
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