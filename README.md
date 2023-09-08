# API Bancária

![GitHub last commit](https://img.shields.io/github/last-commit/futuroDevLeo/desafio-backend-modulo-02-sistema-bancario)

## Descrição

A API Bancária é um projeto que simula um sistema bancário simples, permitindo que os usuários criem contas bancárias, realizem transações (depósitos, saques e transferências), consultem seus saldos e extratos. Esta API foi desenvolvida como parte de um projeto de estudo.

## Funcionalidades

- Criar uma conta bancária com informações pessoais.
- Atualizar informações da conta bancária.
- Excluir uma conta bancária.
- Realizar depósitos em uma conta.
- Realizar saques em uma conta.
- Realizar transferências entre contas.
- Consultar o saldo de uma conta.
- Visualizar o extrato de transações de uma conta.

## Como Funciona

1. Clone este repositório para o seu ambiente local:
```node
git clone https://github.com/futuroDevLeo/desafio-backend-modulo-02-sistema-bancario.git
```

2. Instale as dependências necessárias:
```node
npm install
```

3. Inicie o servidor:
```node
npm run dev
```

4. Acesse a API em:
```
http://localhost:8000.
```

## Endpoints

- GET /contas - Lista todas as contas bancárias.
- POST /contas - Cria uma nova conta bancária.
- PUT /contas/:numeroConta/usuario - Atualiza informações do usuário da conta.
- DELETE /contas/:numeroConta - Exclui uma conta bancária.
- POST /transacoes/depositar - Realiza um depósito em uma conta.
- POST /transacoes/sacar - Realiza um saque em uma conta.
- POST /transacoes/transferir - Realiza uma transferência entre contas.
- GET /contas/saldo - Consulta o saldo de uma conta.
- GET /contas/extrato - Lista o extrato de transações de uma conta.

## Exemplo de Uso

Aqui estão alguns exemplos de como utilizar algumas das endpoints:

### Criar uma Conta Bancária
Acesse:
```
POST /contas
```

#### Corpo da Requisição:
```json
{
    "nome": "João da Silva",
    "cpf": "12345678901",
    "data_nascimento": "1990-01-15",
    "telefone": "111234-5678",
    "email": "joao@example.com",
    "senha": "minha_senha"
}

```

#### Corpo da Resposta:
![Imagem do corpo da resposta vazio](./assets/criarcontas.png)

### Listar Contas Bancarias

Essa endpoint precisa que seja informada a senha do banco como parametro para que as contas cadastradas sejam listadas. Nada deve ser informado no corpo da requisição.

Acesse:
```
GET /contas?senha_banco=Cubos123Bank
```

#### Corpo da Resposta:
![Imagem das contas listadas no corpo da resposta](./assets/listarcontas.png)

### Realizar um Depósito
Acesse:
```
POST /transacoes/depositar
```

#### Corpo da Requisição:
```json
{
    "numero_conta": "1",
    "valor": 1000
}
```

#### Resposta de Sucesso:
![Imagem do corpo da resposta vazio](./assets/depositar.png)

#### Resposta de Erro:
![Imagem do corpo da resposta com mensagem de erro](./assets/errodepositar.png)

### Realizar uma Transferência
Acesse:
```
POST /transacoes/transferir
```
#### Corpo da Requisição:
```json
{
    "numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 200,
	"senha": "minha_senha"
}
```

#### Resposta de Sucesso:
![Imagem do corpo da resposta vazio](./assets/trasnf.png)

#### Resposta de Erro:
![Imagem do corpo da resposta com mensagem de erro](./assets/errotransf.png)

### Emitir Extrato

Essa endpoint precisa que seja informada a senha do usuario e o número da conta como parametros para que o extrato seja emitido. Nada deve ser informado no corpo da requisição.

Acesse:
```
GET /contas/extrato?numero_conta=1&senha=minha_senha
```

#### Resposta de Sucesso:
![Imagem do corpo da resposta com o extrato de movimentações uma conta](./assets/extrato.png)

#### Resposta de Erro:
![Imagem do corpo da resposta com mensagem de erro](./assets/erroextrato.png)